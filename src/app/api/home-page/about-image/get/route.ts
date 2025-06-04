import { NextResponse } from "next/server"
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import connectToDatabase from "@/library/database/db"
import HomeAboutImage from "@/library/model/home-page/homeAboutMeImageSchema"


const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function GET() {
  try {
    await connectToDatabase()

    const aboutImage = await HomeAboutImage.findOne()

    if (!aboutImage) {
      return NextResponse.json({ success: false, message: "No about image found" })
    }

    // Generate a signed URL for the image
    const signedUrl = await getSignedUrl(
      s3Client,
      new GetObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: aboutImage.aboutImage,
      }),
      { expiresIn: 3600 }, // 1 hour
    )

    return NextResponse.json({
      success: true,
      image: signedUrl,
      imageId: aboutImage._id,
    })
  } catch (error) {
    console.error("Error fetching about image:", error)
    return NextResponse.json({ error: "Failed to fetch about image" }, { status: 500 })
  }
}
