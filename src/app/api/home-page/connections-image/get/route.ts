import { NextResponse } from "next/server"
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import connectToDatabase from "@/library/database/db"
import HomeConnectionsImage from "@/library/model/home-page/homeConnectionsImage"


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

    const connectionsImage = await HomeConnectionsImage.findOne()

    if (!connectionsImage) {
      return NextResponse.json({ success: false, message: "No connections image found" })
    }

    // Generate a signed URL for the image
    const signedUrl = await getSignedUrl(
      s3Client,
      new GetObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: connectionsImage.connectionsImage,
      }),
      { expiresIn: 3600 }, // 1 hour
    )

    return NextResponse.json({
      success: true,
      image: signedUrl,
      imageId: connectionsImage._id,
    })
  } catch (error) {
    console.error("Error fetching connections image:", error)
    return NextResponse.json({ error: "Failed to fetch connections image" }, { status: 500 })
  }
}
