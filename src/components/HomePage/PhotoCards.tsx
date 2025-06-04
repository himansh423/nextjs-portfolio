"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { borderColor } from "@/library/constants/colors"
import type { RootState } from "@/redux/store"
import { useSelector } from "react-redux"
import { Edit, Loader2, Upload, Plus, ImagePlus } from "lucide-react"
import axios from "axios"

interface GalleryImage {
  _id: string
  image: string
}

export default function PhotoGallery() {
  const { isAdminLoggedIn } = useSelector((store: RootState) => store.loggedIn)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInitialAnimation, setIsInitialAnimation] = useState(true)
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024)
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploadingImages, setUploadingImages] = useState<Set<string>>(new Set())
  const [selectedFiles, setSelectedFiles] = useState<Map<string, File>>(new Map())

  // Initial upload states
  const [initialUploadFiles, setInitialUploadFiles] = useState<File[]>([])
  const [isInitialUploading, setIsInitialUploading] = useState(false)
  const initialUploadRef = useRef<HTMLInputElement>(null)

  const visibleImages = windowWidth < 640 ? images.slice(0, 3) : images
  const hasFullGallery = images.length >= 5
  const hasNoImages = images.length === 0

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialAnimation(false)
    }, 1000)

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    fetchImages()

    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const fetchImages = async () => {
    try {
      setLoading(true)
      const response = await axios.get("/api/home-page/get-photo-gallery")
      if (response.data.success) {
        setImages(response.data.images)
      }
    } catch (error) {
      console.error("Error fetching images:", error)
      // If API fails, assume no images for initial upload
      setImages([])
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (imageId: string, file: File) => {
    const newSelectedFiles = new Map(selectedFiles)
    newSelectedFiles.set(imageId, file)
    setSelectedFiles(newSelectedFiles)
  }

  const handleImageUpdate = async (imageId: string) => {
    const file = selectedFiles.get(imageId)
    if (!file) return

    setUploadingImages((prev) => new Set(prev).add(imageId))

    try {
      // Get presigned URL for update (this now also returns old file key)
      const { data: urlData } = await axios.post("/api/home-page/update-gallery-image", {
        imageId,
        fileName: file.name,
        fileType: file.type,
      })

      // Upload new image to S3
      await axios.put(urlData.uploadUrl, file, {
        headers: { "Content-Type": file.type },
      })

      // Save to database and delete old image from S3
      await axios.patch("/api/home-page/save-updated-gallery-image", {
        imageId,
        newFileKey: urlData.newFileKey,
        oldFileKey: urlData.oldFileKey,
      })

      // Refresh images
      await fetchImages()

      // Clear selected file
      const newSelectedFiles = new Map(selectedFiles)
      newSelectedFiles.delete(imageId)
      setSelectedFiles(newSelectedFiles)

      alert("Image updated successfully! Old image has been removed from storage.")
    } catch (error) {
      console.error("Error updating image:", error)
      alert("Failed to update image")
    } finally {
      setUploadingImages((prev) => {
        const newSet = new Set(prev)
        newSet.delete(imageId)
        return newSet
      })
    }
  }

  const handleBulkUpdate = async () => {
    if (selectedFiles.size === 0) return

    const uploadPromises = Array.from(selectedFiles.entries()).map(([imageId]) => handleImageUpdate(imageId))

    try {
      await Promise.all(uploadPromises)
      alert(`Successfully updated ${selectedFiles.size} image(s)! Old images have been removed from storage.`)
    } catch (error) {
      console.error("Error in bulk upload:", error)
      alert("Some images failed to update")
    }
  }

  // Initial upload handlers
  const handleInitialFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 5) {
      alert("Please select maximum 5 images")
      return
    }
    setInitialUploadFiles(files)
  }

  const handleInitialUpload = async () => {
    if (initialUploadFiles.length === 0) return

    setIsInitialUploading(true)

    try {
      // Prepare files data for presigned URL generation
      const filesData = initialUploadFiles.map((file) => ({
        fileName: file.name,
        fileType: file.type,
      }))

      // Get presigned URLs
      const { data: urlData } = await axios.post("/api/home-page/get-presigned-url-to-upload-photo-gallery-pictures", {
        files: filesData,
      })

      // Upload each file to S3
      const uploadPromises = urlData.uploads.map(async (uploadInfo: any, index: number) => {
        const file = initialUploadFiles[index]
        await axios.put(uploadInfo.uploadUrl, file, {
          headers: { "Content-Type": file.type },
        })
        return uploadInfo.fileKey
      })

      const uploadedKeys = await Promise.all(uploadPromises)

      // Save to database
      await axios.post("/api/home-page/save-gallery-images", {
        imageUrls: uploadedKeys,
      })

      // Refresh images
      await fetchImages()
      setInitialUploadFiles([])
      alert("Gallery images uploaded successfully!")
    } catch (error) {
      console.error("Error uploading initial images:", error)
      alert("Failed to upload images")
    } finally {
      setIsInitialUploading(false)
    }
  }

  const removeInitialFile = (index: number) => {
    setInitialUploadFiles((prev) => prev.filter((_, i) => i !== index))
  }

  if (loading) {
    return (
      <div
        className={`w-full h-[500px] flex items-center justify-center border-b-[1px] ${borderColor.primary} max-md:h-[300px]`}
      >
        <Loader2 className="animate-spin" size={40} />
      </div>
    )
  }

  // Initial upload interface when no images exist
  if (hasNoImages && isAdminLoggedIn) {
    return (
      <div className="w-full flex flex-col">
        <div
          className={`w-full h-[500px] flex flex-col items-center justify-center border-b-[1px] ${borderColor.primary} max-md:h-[300px] gap-6`}
        >
          <div className="text-center">
            <ImagePlus size={64} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">No Gallery Images Found</h3>
            <p className="text-gray-600 mb-6">Upload up to 5 images to create your photo gallery</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <button
              onClick={() => initialUploadRef.current?.click()}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus size={20} />
              Select Images (Max 5)
            </button>

            <input
              type="file"
              ref={initialUploadRef}
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleInitialFileSelect}
            />

            {initialUploadFiles.length > 0 && (
              <div className="w-full max-w-md">
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Selected Images ({initialUploadFiles.length}/5):</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {initialUploadFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                        <span className="text-sm truncate">{file.name}</span>
                        <button
                          onClick={() => removeInitialFile(index)}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleInitialUpload}
                  disabled={isInitialUploading}
                  className="w-full px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isInitialUploading && <Loader2 className="animate-spin" size={20} />}
                  <Upload size={20} />
                  {isInitialUploading ? "Uploading..." : "Upload Gallery Images"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Show placeholder for non-admin users when no images
  if (hasNoImages && !isAdminLoggedIn) {
    return (
      <div
        className={`w-full h-[500px] flex items-center justify-center border-b-[1px] ${borderColor.primary} max-md:h-[300px]`}
      >
        <div className="text-center">
          <ImagePlus size={64} className="mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600">Gallery images will appear here</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col">
      {/* Admin Controls - Only show update controls when gallery is full */}
      {isAdminLoggedIn && hasFullGallery && selectedFiles.size > 0 && (
        <div className={`w-full p-4 border-b-[1px] ${borderColor.primary} flex justify-center`}>
          <button
            onClick={handleBulkUpdate}
            disabled={uploadingImages.size > 0}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            {uploadingImages.size > 0 && <Loader2 className="animate-spin" size={16} />}
            <Upload size={16} />
            Update Selected Images ({selectedFiles.size})
          </button>
        </div>
      )}

      {/* Gallery */}
      <div
        className={`w-full h-[500px] flex items-center justify-center overflow-hidden border-b-[1px] ${borderColor.primary} max-md:h-[300px]`}
        ref={containerRef}
      >
        <div className="relative w-full max-w-6xl h-[400px] flex items-center justify-center">
          <AnimatePresence>
            {visibleImages.map((imageData, index) => (
              <PhotoCard
                key={imageData._id}
                imageData={imageData}
                index={index}
                total={visibleImages.length}
                containerRef={containerRef}
                isInitialAnimation={isInitialAnimation}
                isSmallScreen={windowWidth < 640}
                isAdmin={isAdminLoggedIn}
                onFileSelect={handleFileSelect}
                onUpdate={handleImageUpdate}
                isUploading={uploadingImages.has(imageData._id)}
                hasSelectedFile={selectedFiles.has(imageData._id)}
                showUpdateControls={hasFullGallery} // Only show update controls when gallery is full
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function PhotoCard({
  imageData,
  index,
  total,
  containerRef,
  isInitialAnimation,
  isSmallScreen,
  isAdmin,
  onFileSelect,
  onUpdate,
  isUploading,
  hasSelectedFile,
  showUpdateControls,
}: {
  imageData: GalleryImage
  index: number
  total: number
  containerRef: React.RefObject<HTMLDivElement | null>
  isInitialAnimation: boolean
  isSmallScreen: boolean
  isAdmin: boolean
  onFileSelect: (imageId: string, file: File) => void
  onUpdate: (imageId: string) => void
  isUploading: boolean
  hasSelectedFile: boolean
  showUpdateControls: boolean
}) {
  const [responsivePos, setResponsivePos] = useState({ x: 0, rotation: 0 })
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const updatePosition = () => {
      const containerWidth = containerRef.current?.offsetWidth || window.innerWidth
      const maxOffset = isSmallScreen ? containerWidth * 0.45 : containerWidth * 0.35
      const step = total > 1 ? maxOffset / ((total - 1) / 2) : 0
      const midIndex = Math.floor(total / 2)
      const relativeIndex = index - midIndex

      setResponsivePos({
        x: relativeIndex * step,
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileSelect(imageData._id, file)
    }
  }

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
          src={imageData.image || "/placeholder.svg"}
          alt={`Photo ${index + 1}`}
          fill
          className="object-cover"
          sizes={isSmallScreen ? "140px" : "280px"}
          priority={index < 3}
        />

        {/* Admin Controls Overlay - Only show when gallery is full */}
        {isAdmin && showUpdateControls && (
          <>
            <div
              className={`absolute top-2 right-2 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors z-20 ${
                hasSelectedFile ? "bg-green-600 hover:bg-green-700" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation()
                fileInputRef.current?.click()
              }}
              onPointerDown={(e) => {
                e.stopPropagation()
              }}
              onMouseDown={(e) => {
                e.stopPropagation()
              }}
            >
              {isUploading ? (
                <Loader2 className="animate-spin text-white" size={16} />
              ) : (
                <Edit className="text-white" size={16} />
              )}
            </div>

            <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handleFileChange} />

            {hasSelectedFile && (
              <div className="absolute bottom-2 right-2 z-20">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onUpdate(imageData._id)
                  }}
                  onPointerDown={(e) => {
                    e.stopPropagation()
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation()
                  }}
                  disabled={isUploading}
                  className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 disabled:opacity-50 flex items-center gap-1"
                >
                  {isUploading ? <Loader2 className="animate-spin" size={12} /> : <Upload size={12} />}
                  Update
                </button>
              </div>
            )}
          </>
        )}

        <div
          className="absolute inset-0 bg-transparent bg-opacity-10 z-10 pointer-events-none"
          style={{
            borderRadius: "18px",
          }}
        />
      </div>
    </motion.div>
  )
}
