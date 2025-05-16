"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import Image from "next/image"
import cardImg1 from "../../../public/cardimg1.jpg"
import cardImg2 from "../../../public/cardimg2.jpg"
import cardImg3 from "../../../public/cardimg3.jpg"
import cardImg4 from "../../../public/cardimg4.jpg"
import cardImg5 from "../../../public/cardimg5.jpg"
import { borderColor } from "@/library/constants/colors"

export default function PhotoGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInitialAnimation, setIsInitialAnimation] = useState(true)
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024)

  const images = [cardImg1.src, cardImg2.src, cardImg3.src, cardImg4.src, cardImg5.src]

  const visibleImages =
    windowWidth < 640
      ? images.slice(0, 3) 
      : images

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialAnimation(false)
    }, 1000)

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div
      className={`w-full h-[500px] flex items-center justify-center overflow-hidden border-b-[1px] ${borderColor.primary} max-md:h-[300px]`}
      ref={containerRef}
    >
      <div className="relative w-full max-w-6xl h-[400px] flex items-center justify-center">
        <AnimatePresence>
          {visibleImages.map((src, index) => (
            <PhotoCard
              key={index}
              src={src}
              index={index}
              total={visibleImages.length}
              containerRef={containerRef}
              isInitialAnimation={isInitialAnimation}
              isSmallScreen={windowWidth < 640}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

function PhotoCard({
  src,
  index,
  total,
  containerRef,
  isInitialAnimation,
  isSmallScreen,
}: {
  src: string
  index: number
  total: number
  containerRef: React.RefObject<HTMLDivElement | null>
  isInitialAnimation: boolean
  isSmallScreen: boolean
}) {
  const [responsivePos, setResponsivePos] = useState({ x: 0, rotation: 0 })

  useEffect(() => {
    const updatePosition = () => {
      const containerWidth = containerRef.current?.offsetWidth || window.innerWidth

     
      const maxOffset = isSmallScreen
        ? containerWidth * 0.45 
        : containerWidth * 0.35

      const step = total > 1 ? maxOffset / ((total - 1) / 2) : 0
      const midIndex = Math.floor(total / 2)
      const relativeIndex = index - midIndex

      setResponsivePos({
        x: relativeIndex * step,
        // Less rotation on small screens for better visibility
        rotation: isSmallScreen ? relativeIndex * 2 : relativeIndex * 3,
      })
    }

    updatePosition()
    window.addEventListener("resize", updatePosition)
    return () => window.removeEventListener("resize", updatePosition)
  }, [index, total, containerRef, isSmallScreen])

  const baseX = responsivePos.x
  const baseRotation = responsivePos.rotation

  const x = useMotionValue(isInitialAnimation ? 0 : baseX)
  const y = useMotionValue(0)
  const rotation = useMotionValue(isInitialAnimation ? 0 : baseRotation)

  const springConfig = { damping: 30, stiffness: 350 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)
  const rotationSpring = useSpring(rotation, springConfig)

  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    if (!isInitialAnimation) {
      const delay = index * 100
      setTimeout(() => {
        x.set(baseX)
        rotation.set(baseRotation)
      }, delay)
    }
  }, [isInitialAnimation, baseX, baseRotation, index, x, rotation])

  // Adjust card size for small screens
  const cardSizeClass = isSmallScreen
    ? "w-[140px] h-[200px]"
    : "w-[280px] h-[350px] max-small-l:w-[200px] max-small-l:h-[270px] max-md:w-[150px] max-md:h-[220px]"

  return (
    <motion.div
      className="absolute cursor-grab active:cursor-grabbing"
      style={{
        x: xSpring,
        y: ySpring,
        rotate: rotationSpring,
        zIndex: isDragging ? 50 : isInitialAnimation ? total - index : index + 1,
        left: "50%",
        transformOrigin: "center center",
      }}
      initial={{
        scale: isInitialAnimation ? 0.95 : 1,
        y: isInitialAnimation ? -10 * index : 0,
      }}
      animate={{
        scale: isDragging ? 1.08 : 1,
        y: isInitialAnimation ? -10 * index : 0,
      }}
      drag={!isInitialAnimation}
      dragConstraints={containerRef}
      dragElastic={0.15}
      dragTransition={{ bounceStiffness: 350, bounceDamping: 25 }}
      whileHover={
        !isInitialAnimation
          ? {
              scale: 1.05,
              zIndex: total + 5,
              transition: { duration: 0.2 },
            }
          : {}
      }
      whileDrag={{
        scale: 1.08,
        zIndex: total + 10,
        cursor: "grabbing",
      }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => {
        setIsDragging(false)
        xSpring.set(baseX)
        ySpring.set(0)
        rotationSpring.set(baseRotation)
      }}
    >
      <div
        className={`relative overflow-hidden shadow-lg ${cardSizeClass}`}
        style={{
          borderRadius: "18px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          backgroundColor: "#f5f5f5",
          transform: "translateX(-50%)",
        }}
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={`Photo ${index + 1}`}
          fill
          className="object-cover"
          sizes={isSmallScreen ? "140px" : "280px"}
          priority={index < 3}
        />
        <div
          className="absolute inset-0 bg-transparent bg-opacity-10 z-10"
          style={{
            borderRadius: "18px",
          }}
        />
      </div>
    </motion.div>
  )
}
