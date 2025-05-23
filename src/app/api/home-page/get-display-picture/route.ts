import { NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import connectToDatabase from "@/library/database/db";
import HomeDisplayPicture from "@/library/model/home-page/homeDisplayPictureSchema";

// AWS S3 Configuration
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET(req: Request) {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    const record = await HomeDisplayPicture.findOne();

    if (!record) {
      return NextResponse.json(
        { error: "Display Picture not found." },
        { status: 404 }
      );
    }

    // Generate pre-signed URL
    const displayPictureUrl = await getSignedUrl(
      s3Client,
      new GetObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: record.image,
      }),
      { expiresIn: 3600 }
    );

    const data = {
      image: displayPictureUrl,
      alt: record.alt,
    };

    // Return the data as JSON
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching event details:", error);
    return NextResponse.json(
      { error: "Failed to fetch event details." },
      { status: 500 }
    );
  }
}
