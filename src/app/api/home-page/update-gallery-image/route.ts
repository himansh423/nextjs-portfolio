import { NextResponse } from "next/server"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { nanoid } from "nanoid"
import connectToDatabase from "@/library/database/db"
import HomePhotoGallery from "@/library/model/home-page/HomePhotoGallerySchema"

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function POST(req: Request) {
  try {
    const { imageId, fileName, fileType } = await req.json()

    if (!imageId || !fileName || !fileType) {
      return NextResponse.json({ error: "Image ID, file name, and file type are required" }, { status: 400 })
    }

    await connectToDatabase()

    // Get the existing image to retrieve the old file key
    const existingImage = await HomePhotoGallery.findById(imageId)
    if (!existingImage) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 })
    }

    const oldFileKey = existingImage.image
    const newFileKey = `photo-gallery/${nanoid()}-${fileName}`

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: newFileKey,
      ContentType: fileType,
    })

    const uploadUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600, // 1 hour
    })

    return NextResponse.json({
      success: true,
      uploadUrl,
      newFileKey,
      oldFileKey,
      imageId,
    })
  } catch (error: unknown) {
    console.error("Error generating update URL:", error)
    return NextResponse.json({ error: "Failed to generate update URL" }, { status: 500 })
  }
}
