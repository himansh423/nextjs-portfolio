import { NextResponse } from "next/server"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { nanoid } from "nanoid"

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function POST(req: Request) {
  try {
    const { fileName, fileType } = await req.json()

    if (!fileName || !fileType) {
      return NextResponse.json({ error: "File name and file type are required" }, { status: 400 })
    }

    const fileKey = `connections-image/${nanoid()}-${fileName}`

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: fileKey,
      ContentType: fileType,
    })

    const uploadUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600, // 1 hour
    })

    return NextResponse.json({
      success: true,
      uploadUrl,
      fileKey,
    })
  } catch (error: unknown) {
    console.error("Error generating pre-signed URL:", error)
    return NextResponse.json({ error: "Failed to generate pre-signed URL" }, { status: 500 })
  }
}
