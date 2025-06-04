import { NextResponse } from "next/server"
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3"
import connectToDatabase from "@/library/database/db"
import HomeAboutImage from "@/library/model/home-page/homeAboutMeImageSchema"


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
    const existingImage = await HomeAboutImage.findOne()

    if (existingImage) {
      // Delete old image from S3 if it exists
      const oldFileKey = existingImage.aboutImage

      if (oldFileKey && oldFileKey.startsWith("about-image/")) {
        try {
          const deleteCommand = new DeleteObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME!,
            Key: oldFileKey,
          })

          await s3Client.send(deleteCommand)
          console.log(`Successfully deleted old about image: ${oldFileKey}`)
        } catch (deleteError) {
          console.error(`Failed to delete old about image ${oldFileKey}:`, deleteError)
          // Continue with the update even if deletion fails
        }
      }

      // Update existing record
      existingImage.aboutImage = fileKey
      await existingImage.save()

      return NextResponse.json({
        success: true,
        message: "About image updated successfully",
        image: existingImage,
      })
    } else {
      // Create new record
      const newImage = await HomeAboutImage.create({ aboutImage: fileKey })

      return NextResponse.json({
        success: true,
        message: "About image saved successfully",
        image: newImage,
      })
    }
  } catch (error) {
    console.error("Error saving about image:", error)
    return NextResponse.json({ error: "Failed to save about image" }, { status: 500 })
  }
}
