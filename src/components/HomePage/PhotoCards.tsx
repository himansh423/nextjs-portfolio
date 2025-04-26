"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import cardImg1 from "../../../public/cardimg1.jpg";
import cardImg2 from "../../../public/cardimg2.jpg";
import cardImg3 from "../../../public/cardimg3.jpg";
import cardImg4 from "../../../public/cardimg4.jpg";
import cardImg5 from "../../../public/cardimg5.jpg";

export default function PhotoGallery() {
  const containerRef = useRef(null);
  
  const images = [
    cardImg1.src,
    cardImg2.src,
    cardImg3.src,
    cardImg4.src,
    cardImg5.src,
  ];
  
  return (
    <div
      className="w-full h-[500px] flex items-center justify-center overflow-hidden"
      ref={containerRef}
    >
      <div className="relative w-full max-w-6xl h-[400px] flex items-center justify-center">
        {images.map((src, index) => (
          <PhotoCard
            key={index}
            src={src}
            index={index}
            total={images.length}
            containerRef={containerRef}
          />
        ))}
      </div>
    </div>
  );
}

function PhotoCard({ src, index, total, containerRef }: any) {
 
  const positions = [
    { x: -450, rotation: -6 },  
    { x: -225, rotation: -2 },  
    { x: 0, rotation: 0 },      
    { x: 225, rotation: 3 },   
    { x: 450, rotation: 5 },  
  ];
  
  const pos = positions[index] || { x: 0, rotation: 0 };
  const baseX = pos.x;
  const baseRotation = pos.rotation;
  
  const x = useMotionValue(baseX);
  const y = useMotionValue(0);
  const rotation = useMotionValue(baseRotation);
  
  const springConfig = { damping: 30, stiffness: 350 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);
  const rotationSpring = useSpring(rotation, springConfig);
  
  const [isDragging, setIsDragging] = useState(false);
  
  return (
    <motion.div
      className="absolute cursor-grab active:cursor-grabbing"
      style={{
        x: xSpring,
        y: ySpring,
        rotate: rotationSpring,
        zIndex: isDragging ? 50 : index + 1,
        left: "50%",
        transformOrigin: "center center",
      }}
      drag
      dragConstraints={containerRef}
      dragElastic={0.15}
      dragTransition={{ bounceStiffness: 350, bounceDamping: 25 }}
      whileHover={{
        scale: 1.05,
        zIndex: total + 5,
        transition: { duration: 0.2 },
      }}
      whileDrag={{
        scale: 1.08,
        zIndex: total + 10,
        cursor: "grabbing",
      }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => {
        setIsDragging(false);
        xSpring.set(baseX);
        ySpring.set(0);
        rotationSpring.set(baseRotation);
      }}
    >
      <div
        className="relative overflow-hidden shadow-lg"
        style={{
          width: "280px",
          height: "350px",
          borderRadius: "18px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          backgroundColor: "#f5f5f5",
          transform: `translateX(-50%)`,
        }}
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={`Photo ${index + 1}`}
          fill
          className="object-cover"
          sizes="280px"
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
  );
}