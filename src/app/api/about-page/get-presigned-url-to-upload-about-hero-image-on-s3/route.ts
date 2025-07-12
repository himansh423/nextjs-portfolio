import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

// AWS S3 Configuration
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const { files } = await req.json();

    if (!files || !Array.isArray(files)) {
      return NextResponse.json(
        { error: "Files array is required" },
        { status: 400 }
      );
    }

    const uploadData = await Promise.all(
      files.map(async (file: { fileName: string; fileType: string }) => {
        const fileKey = `about-hero-image/${nanoid()}-${file.fileName}`;

        const command = new PutObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME!,
          Key: fileKey,
          ContentType: file.fileType,
        });

        const uploadUrl = await getSignedUrl(s3Client, command, {
          expiresIn: 3600, // 1 hour
        });

        return {
          fileName: file.fileName,
          fileKey,
          uploadUrl,
        };
      })
    );

    return NextResponse.json({
      success: true,
      uploads: uploadData,
    });
  } catch (error: unknown) {
    if (error instanceof Error)
      console.error(
        "Error generating pre-signed upload URLs:",
        error.message,
        error.stack
      );
    return NextResponse.json(
      { error: "Failed to generate pre-signed upload URLs." },
      { status: 500 }
    );
  }
}
