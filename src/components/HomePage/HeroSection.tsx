"use client"
import { borderColor, fontColor } from "@/library/constants/colors"
import type React from "react"

import Image from "next/image"
import PhotoGallery from "./PhotoCards"
import { racingSans } from "@/library/constants/fonts"
import { motion } from "framer-motion"
import { Plus, Loader2 } from "lucide-react"
import type { RootState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { homeHeroActions } from "@/redux/homeHeroSlice"

const HeroSection = () => {
  const { isAdminLoggedIn } = useSelector((store: RootState) => store.loggedIn)
  const { picture, loading } = useSelector((store: RootState) => store.homeHero)
  const dispatch = useDispatch()
  const [image, setImage] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [profileImageLoading, setProfileImageLoading] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [file])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleUpload = async () => {
    if (!file) return
    dispatch(homeHeroActions.setLoading(true))
    try {
      const dpFileName = file.name
      const dpFileType = file.type
      const { data } = await axios.post("/api/home-page/get-presigned-url-to-upload-display-picture-on-s3", {
        dpFileName,
        dpFileType,
      })
      const { dpUploadUrl, dpFileKey } = data
      await axios.put(dpUploadUrl, file, {
        headers: { "Content-Type": dpFileType },
      })
      const res = await axios.patch(`/api/home-page/save-display-picture-on-database`, {
        dpFileKey,
      })
      if (res.data.success) {
        await getDisplayPicture()
        setImage(null)
        setFile(null)
        alert("Profile picture updated!")
      }
    } catch (error) {
      console.error("Upload failed:", error)
      alert("Failed to upload profile picture.")
    } finally {
      dispatch(homeHeroActions.setLoading(false))
    }
  }

  const getDisplayPicture = async () => {
    try {
      const res = await axios.get("/api/home-page/get-display-picture")
      if (res.data.success) {
        dispatch(homeHeroActions.setPicture(res.data.image))
      }
    } catch (error: unknown) {
      console.error("Something went Wrong")
    }
  }

  useEffect(() => {
    getDisplayPicture()
  }, [])

  return (
    <div className="w-full flex flex-col">
      {/* profile Box */}
      <div
        className={`w-full h-[250px] flex justify-center items-center border-b-[1px] ${
          borderColor.primary
        } max-sm:h-[220px] ${isAdminLoggedIn ? "flex-col" : null} `}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            scale: { type: "spring", bounce: 0.5 },
          }}
          className={`w-[140px] h-[140px] rounded-full border-[1px] ${borderColor.primary} flex justify-center items-center mt-10 max-sm:mt-0`}
        >
          <div
            className={`w-[110px] h-[110px] rounded-full border-[1px] ${
              borderColor.primary
            } flex justify-center items-center
              ${isAdminLoggedIn && "relative"}
            `}
          >
            <div
              className={`w-[100px] h-[100px] rounded-full border-[1px] ${borderColor.primary} overflow-hidden relative`}
            >
              {profileImageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-full z-10">
                  <Loader2 className="animate-spin text-gray-400" size={24} />
                </div>
              )}
              <Image
                src={image || picture || "/placeholder.jpg"}
                alt="profileImage"
                objectFit="cover"
                fill
                onLoad={() => setProfileImageLoading(false)}
                onError={() => setProfileImageLoading(false)}
              />
            </div>
            {/* For admin: upload button */}
            {isAdminLoggedIn && (
              <>
                <div
                  className={`w-[50px] h-[50px] rounded-full absolute bottom-[-10px] right-[-20px] bg-red-500 flex justify-center items-center text-white cursor-pointer`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Plus />
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </>
            )}
          </div>
        </motion.div>
        {isAdminLoggedIn && file && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleUpload}
              disabled={loading}
              className={`px-6 py-2 rounded-md font-semibold bg-blue-600 text-white ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
              } flex items-center gap-2`}
            >
              {loading && <Loader2 className="animate-spin" size={20} />}
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        )}
      </div>
      {/* profile Box */}
      {/* Upload Button (only visible when file is selected and user is admin) */}
      {/* Hey Box */}
      <div
        className={`w-full py-2 flex justify-center px-[250px] max-small-l:px-[140px] text-center border-b-[1px] ${borderColor.primary} max-md:px-[80px] max-sm:px-2`}
      >
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.5,
            ease: "easeOut",
          }}
          className={`${fontColor.primary} ${racingSans.className} font-semibold text-6xl max-sm:text-[36px]  `}
        >
          Hey, I&apos;m Himanshu! Welcome to my corner of the internet!
        </motion.p>
      </div>
      {/* Hey Box */}
      {/* description box */}
      <div
        className={`w-full flex items-center ${fontColor.secondry} text-center px-[250px] py-2 border-y-[1px] mt-7 ${borderColor.primary} max-md:px-[60px] max-sm:px-2`}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 1,
            ease: "easeOut",
          }}
        >
          I'm a Full Stack Developer who loves design and enjoys experimenting. This site is my creative
          lab—intentionally overbuilt to test ideas, explore concepts, and break things just to see what works!
        </motion.p>
      </div>
      {/* description box */}
      {/* Images Box */}
      <div>
        <PhotoGallery />
      </div>
      {/* Images Box */}
    </div>
  )
}

export default HeroSection
