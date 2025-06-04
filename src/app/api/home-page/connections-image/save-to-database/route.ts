import { NextResponse } from "next/server"
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3"
import connectToDatabase from "@/library/database/db"
import HomeConnectionsImage from "@/library/model/home-page/homeConnectionsImage"

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function POST(req: Request) {
  try {
    const { fileKey } = await req.json()

    if (!fileKey) {
      return NextResponse.json({ error: "File key is required" }, { status: 400 })
    }

    await connectToDatabase()

    // Check if an image already exists
    const existingImage = await HomeConnectionsImage.findOne()

    if (existingImage) {
      // Delete old image from S3 if it exists
      const oldFileKey = existingImage.connectionsImage

      if (oldFileKey && oldFileKey.startsWith("connections-image/")) {
        try {
          const deleteCommand = new DeleteObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME!,
            Key: oldFileKey,
          })

          await s3Client.send(deleteCommand)
          console.log(`Successfully deleted old connections image: ${oldFileKey}`)
        } catch (deleteError) {
          console.error(`Failed to delete old connections image ${oldFileKey}:`, deleteError)
          // Continue with the update even if deletion fails
        }
      }

      // Update existing record
      existingImage.connectionsImage = fileKey
      await existingImage.save()

      return NextResponse.json({
        success: true,
        message: "Connections image updated successfully",
        image: existingImage,
      })
    } else {
      // Create new record
      const newImage = await HomeConnectionsImage.create({ connectionsImage: fileKey })

      return NextResponse.json({
        success: true,
        message: "Connections image saved successfully",
        image: newImage,
      })
    }
  } catch (error) {
    console.error("Error saving connections image:", error)
    return NextResponse.json({ error: "Failed to save connections image" }, { status: 500 })
  }
}
