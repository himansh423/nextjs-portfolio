import { NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import connectToDatabase from "@/library/database/db";
import HomePhotoGallery from "@/library/model/home-page/HomePhotoGallerySchema";
import AboutHeroImage from "@/library/model/about-page/AboutHeroImage";

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
    await connectToDatabase();

    const images = await AboutHeroImage.find();

    if (!images || images.length === 0) {
      return NextResponse.json(
        { error: "No About Hero images found." },
        { status: 404 }
      );
    }

    const signedUrls = await Promise.all(
      images.map(async (imgDoc) => {
        const signedUrl = await getSignedUrl(
          s3Client,
          new GetObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME!,
            Key: imgDoc.image,
          }),
          { expiresIn: 3600 } 
        );

        return {
          _id: imgDoc._id,
          image: signedUrl,
        };
      })
    );

    return NextResponse.json({ success: true, images: signedUrls });
  } catch (error) {
    console.error("Error fetching About hero images:", error);
    return NextResponse.json(
      { error: "Failed to fetch about hero images." },
      { status: 500 }
    );
  }
}
