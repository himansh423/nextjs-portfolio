"use client"
import { borderColor, fontColor } from "@/library/constants/colors"
import { racingSans } from "@/library/constants/fonts"
import Image from "next/image"
import type React from "react"
import { useState, useRef, useEffect } from "react"
import type { RootState } from "@/redux/store"
import { useSelector } from "react-redux"
import { Edit, Loader2, Upload, Plus } from "lucide-react"
import axios from "axios"

interface HeroImage {
  _id: string
  image: string
}

const HeroSection = () => {
  const { isAdminLoggedIn } = useSelector((store: RootState) => store.loggedIn)
  const [images, setImages] = useState<HeroImage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploadingImages, setUploadingImages] = useState<Set<string>>(new Set())
  const [selectedFiles, setSelectedFiles] = useState<Map<string, File>>(new Map())
  const [individualImageLoading, setIndividualImageLoading] = useState<Map<string, boolean>>(new Map())

  // Initial upload states
  const [initialUploadFiles, setInitialUploadFiles] = useState<File[]>([])
  const [isInitialUploading, setIsInitialUploading] = useState(false)
  const [showInitialUpload, setShowInitialUpload] = useState(false)
  const initialUploadRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      setLoading(true)
      const response = await axios.get("/api/about-page/get-about-hero-image")
      if (response.data.success) {
        setImages(response.data.images)
        // Initialize individual loading states for database images
        const loadingStates = new Map()
        response.data.images.forEach((img: HeroImage) => {
          loadingStates.set(img._id, true)
        })
        setIndividualImageLoading(loadingStates)
      }
    } catch (error) {
      console.error("Error fetching hero images:", error)
      setImages([])
    } finally {
      setLoading(false)
    }
  }

  const handleImageLoad = (imageId: string) => {
    setIndividualImageLoading((prev) => {
      const newStates = new Map(prev)
      newStates.set(imageId, false)
      return newStates
    })
  }

  const handleImageError = (imageId: string) => {
    setIndividualImageLoading((prev) => {
      const newStates = new Map(prev)
      newStates.set(imageId, false)
      return newStates
    })
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
      // Get presigned URL for update
      const { data: urlData } = await axios.post("/api/about-page/get-presigned-url-to-update-about-hero-image", {
        imageId,
        fileName: file.name,
        fileType: file.type,
      })

      // Upload new image to S3
      await axios.put(urlData.uploadUrl, file, {
        headers: { "Content-Type": file.type },
      })

      // Save to database and delete old image from S3
      await axios.patch("/api/about-page/save-updated-about-hero-image", {
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
      alert("Hero image updated successfully!")
    } catch (error) {
      console.error("Error updating hero image:", error)
      alert("Failed to update hero image")
    } finally {
      setUploadingImages((prev) => {
        const newSet = new Set(prev)
        newSet.delete(imageId)
        return newSet
      })
    }
  }

  // Initial upload handlers
  const handleInitialFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 3) {
      alert("Please select maximum 3 images for hero section")
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
      const { data: urlData } = await axios.post("/api/about-page/get-presigned-url-to-upload-about-hero-image-on-s3", {
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
      await axios.post("/api/about-page/save-about-hero-image-to-database", {
        imageUrls: uploadedKeys,
      })

      // Refresh images
      await fetchImages()
      setInitialUploadFiles([])
      setShowInitialUpload(false)
      alert("Hero images uploaded successfully!")
    } catch (error) {
      console.error("Error uploading initial hero images:", error)
      alert("Failed to upload hero images")
    } finally {
      setIsInitialUploading(false)
    }
  }

  const removeInitialFile = (index: number) => {
    setInitialUploadFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const getImageSrc = (index: number) => {
    // Return database image if exists
    if (images[index]?.image) {
      return images[index].image
    }
    // Return fallback images when no database images
    switch (index) {
      case 0:
        return "/cardimg1.jpg"
      case 1:
        return "/cardimg2.jpg"
      case 2:
        return "/cardimg5.jpg"
      default:
        return "/placeholder.svg"
    }
  }

  // Show main loader during initial API fetch
  if (loading) {
    return (
      <div className={`w-full h-[300px] border-b-[1px] ${borderColor.primary} flex items-center max-small-l:h-fit`}>
        <div
          className={`w-full h-[150px] border-y-[1px] ${borderColor.primary} flex px-[100px] max-small-l:h-fit max-small-l:my-20 max-small-l:px-10 max-md:flex-col-reverse items-center justify-center`}
        >
          <Loader2 className="animate-spin text-gray-400" size={40} />
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col">
      {/* Admin Upload Controls - Only show when no images and admin wants to upload */}
      {isAdminLoggedIn && images.length === 0 && (
        <div className={`w-full p-4 border-b-[1px] ${borderColor.primary} flex justify-center gap-4`}>
          <button
            onClick={() => setShowInitialUpload(!showInitialUpload)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus size={16} />
            {showInitialUpload ? "Cancel Upload" : "Upload Hero Images"}
          </button>
        </div>
      )}

      {/* Initial Upload Interface - Only show when toggled */}
      {showInitialUpload && isAdminLoggedIn && (
        <div className={`w-full p-6 border-b-[1px] ${borderColor.primary} bg-gray-50`}>
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-4 text-center">Upload Hero Images (Max 3)</h3>

            <button
              onClick={() => initialUploadRef.current?.click()}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center gap-2 mb-4"
            >
              <Plus size={20} />
              Select Images
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
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Selected Images ({initialUploadFiles.length}/3):</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {initialUploadFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                      <span className="text-sm truncate">{file.name}</span>
                      <button
                        onClick={() => removeInitialFile(index)}
                        className="text-red-500 hover:text-red-700 ml-2 font-bold"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleInitialUpload}
                  disabled={isInitialUploading}
                  className="w-full mt-4 px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isInitialUploading && <Loader2 className="animate-spin" size={20} />}
                  <Upload size={20} />
                  {isInitialUploading ? "Uploading..." : "Upload Images"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Original Hero Section Layout */}
      <div className={`w-full h-[300px] border-b-[1px] ${borderColor.primary} flex items-center max-small-l:h-fit`}>
        <div
          className={`w-full h-[150px] border-y-[1px] ${borderColor.primary} flex px-[100px] max-small-l:h-fit max-small-l:my-20 max-small-l:px-10 max-md:flex-col-reverse`}
        >
          <div className="flex flex-col max-small-l:w-[366px] max-md:items-center max-md:w-full">
            <p className={`text-[14px] font-semibold text-[#4f46ef]`}>Good afternoon</p>
            <p
              className={`text-[50px] leading-[60px] ${fontColor.primary} ${racingSans.className} font-bold max-md:text-center`}
            >
              I&apos;m Himanshu, a creative <br /> Full Stack Developer.
            </p>
          </div>
          <div className="flex-1 h-full relative max-md:static max-md:hidden">
            {/* First Image - Top Left */}
            <div
              className={`w-[145px] absolute top-[-15px] left-[40px] h-[145px] -rotate-6 z-10 rounded-lg hover:-rotate-3 hover:scale-110 duration-300 overflow-hidden max-small-l:left-[60px] max-small-l:top-[30px] max-md:static max-md:top-0`}
            >
              <div className={`w-full h-full relative`}>
                {/* Individual image loading overlay - only for database images */}
                {images[0] && individualImageLoading.get(images[0]._id) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-30 rounded-lg">
                    <Loader2 className="animate-spin text-gray-400" size={20} />
                  </div>
                )}

                <Image
                  src={getImageSrc(0) || "/placeholder.svg"}
                  alt="Hero image 1"
                  fill
                  style={{ objectFit: "cover" }}
                  onLoad={() => images[0] && handleImageLoad(images[0]._id)}
                  onError={() => images[0] && handleImageError(images[0]._id)}
                />

                {/* Admin Controls */}
                {isAdminLoggedIn && images[0] && (
                  <HeroImageControls
                    imageData={images[0]}
                    onFileSelect={handleFileSelect}
                    onUpdate={handleImageUpdate}
                    isUploading={uploadingImages.has(images[0]._id)}
                    hasSelectedFile={selectedFiles.has(images[0]._id)}
                  />
                )}
              </div>
            </div>

            {/* Second Image - Center */}
            <div
              className={`w-[145px] absolute translate-y-[-50%] top-[50%] translate-x-[-50%] left-[50%] h-[145px] rounded-lg z-20 rotate-6 hover:rotate-3 hover:scale-110 duration-300 overflow-hidden max-small-l:top-[120px] max-md:static`}
            >
              <div className={`w-full h-full relative`}>
                {/* Individual image loading overlay - only for database images */}
                {images[1] && individualImageLoading.get(images[1]._id) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-30 rounded-lg">
                    <Loader2 className="animate-spin text-gray-400" size={20} />
                  </div>
                )}

                <Image
                  src={getImageSrc(1) || "/placeholder.svg"}
                  alt="Hero image 2"
                  fill
                  style={{ objectFit: "cover" }}
                  onLoad={() => images[1] && handleImageLoad(images[1]._id)}
                  onError={() => images[1] && handleImageError(images[1]._id)}
                />

                {/* Admin Controls */}
                {isAdminLoggedIn && images[1] && (
                  <HeroImageControls
                    imageData={images[1]}
                    onFileSelect={handleFileSelect}
                    onUpdate={handleImageUpdate}
                    isUploading={uploadingImages.has(images[1]._id)}
                    hasSelectedFile={selectedFiles.has(images[1]._id)}
                  />
                )}
              </div>
            </div>

            {/* Third Image - Bottom Right */}
            <div
              className={`w-[145px] absolute bottom-[-15px] right-[40px] h-[145px] -rotate-3 rounded-lg z-10 hover:rotate-6 hover:scale-110 duration-300 overflow-hidden max-small-l:top-[60px] max-small-l:right-[50px] max-md:static`}
            >
              <div className={`w-full h-full relative`}>
                {/* Individual image loading overlay - only for database images */}
                {images[2] && individualImageLoading.get(images[2]._id) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-30 rounded-lg">
                    <Loader2 className="animate-spin text-gray-400" size={20} />
                  </div>
                )}

                <Image
                  src={getImageSrc(2) || "/placeholder.svg"}
                  alt="Hero image 3"
                  fill
                  style={{ objectFit: "cover" }}
                  onLoad={() => images[2] && handleImageLoad(images[2]._id)}
                  onError={() => images[2] && handleImageError(images[2]._id)}
                />

                {/* Admin Controls */}
                {isAdminLoggedIn && images[2] && (
                  <HeroImageControls
                    imageData={images[2]}
                    onFileSelect={handleFileSelect}
                    onUpdate={handleImageUpdate}
                    isUploading={uploadingImages.has(images[2]._id)}
                    hasSelectedFile={selectedFiles.has(images[2]._id)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface HeroImageControlsProps {
  imageData: HeroImage
  onFileSelect: (imageId: string, file: File) => void
  onUpdate: (imageId: string) => void
  isUploading: boolean
  hasSelectedFile: boolean
}

function HeroImageControls({
  imageData,
  onFileSelect,
  onUpdate,
  isUploading,
  hasSelectedFile,
}: HeroImageControlsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileSelect(imageData._id, file)
    }
  }

  return (
    <>
      <div
        className={`absolute top-2 right-2 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors z-20 ${
          hasSelectedFile ? "bg-green-600 hover:bg-green-700" : ""
        }`}
        onClick={(e) => {
          e.stopPropagation()
          fileInputRef.current?.click()
        }}
      >
        {isUploading ? (
          <Loader2 className="animate-spin text-white" size={12} />
        ) : (
          <Edit className="text-white" size={12} />
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
            disabled={isUploading}
            className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 disabled:opacity-50 flex items-center gap-1"
          >
            {isUploading ? <Loader2 className="animate-spin" size={10} /> : <Upload size={10} />}
            Update
          </button>
        </div>
      )}
    </>
  )
}

export default HeroSection
