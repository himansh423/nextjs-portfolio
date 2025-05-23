import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const { dpFileName, dpFileType } = await req.json();

    if (!dpFileName || !dpFileType) {
      return NextResponse.json(
        { error: "All fields are required: dpFileName, dpFileType." },
        { status: 400 }
      );
    }

    const bucketName = process.env.S3_BUCKET_NAME!;
    const dpFileKey = `uploads/dp-${nanoid()}-${dpFileName}`;

    // Generate signed URLs
    const dpCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: dpFileKey,
      ContentType: dpFileType,
    });

    const dpUploadUrl = await getSignedUrl(s3Client, dpCommand, {
      expiresIn: 60,
    });

    return NextResponse.json({
      dpUploadUrl,
      dpFileKey,
    });
  } catch (error) {
    console.error("Error generating pre-signed URLs:", error);
    return NextResponse.json(
      { error: "Failed to generate pre-signed URLs." },
      { status: 500 }
    );
  }
}
