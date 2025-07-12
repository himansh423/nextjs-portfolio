import { NextResponse } from "next/server"
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3"
import connectToDatabase from "@/library/database/db"
import AboutHeroImage from "@/library/model/about-page/AboutHeroImage"

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function PATCH(req: Request) {
  try {
    const { imageId, newFileKey, oldFileKey } = await req.json()

    if (!imageId || !newFileKey) {
      return NextResponse.json({ error: "Image ID and new file key are required" }, { status: 400 })
    }

    await connectToDatabase()

    // Update the database with the new file key
    const updatedImage = await AboutHeroImage.findByIdAndUpdate(imageId, { image: newFileKey }, { new: true })

    if (!updatedImage) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 })
    }

    // Delete the old image from S3 if it exists and is not a placeholder
    if (oldFileKey && !oldFileKey.includes("placeholder") && oldFileKey.startsWith("photo-gallery/")) {
      try {
        const deleteCommand = new DeleteObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME!,
          Key: oldFileKey,
        })

        await s3Client.send(deleteCommand)
        console.log(`Successfully deleted old image: ${oldFileKey}`)
      } catch (deleteError) {
        console.error(`Failed to delete old image ${oldFileKey}:`, deleteError)
        // Don't fail the entire operation if deletion fails
        // The new image is already saved, so we can continue
      }
    }

    return NextResponse.json({
      success: true,
      message: "Image updated successfully and old image deleted",
      image: updatedImage,
    })
  } catch (error) {
    console.error("Error updating image:", error)
    return NextResponse.json({ error: "Failed to update image" }, { status: 500 })
  }
}
