import { NextRequest, NextResponse } from "next/server";
import { S3Client, HeadObjectCommand } from "@aws-sdk/client-s3";
import connectToDatabase from "@/library/database/db";
import HomeDisplayPicture from "@/library/model/home-page/homeDisplayPictureSchema";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

async function validateFileInS3(key: string): Promise<boolean> {
  try {
    const command = new HeadObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: key,
    });
    await s3Client.send(command);
    return true;
  } catch (error) {
    console.error(`S3 validation failed for key: ${key}`, error);
    return false;
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { profilePictureKey, alt } = await req.json();

    if (!profilePictureKey || !alt) {
      return NextResponse.json(
        { error: "profilePictureKey and alt are required." },
        { status: 400 }
      );
    }

    const isValid = await validateFileInS3(profilePictureKey);
    if (!isValid) {
      return NextResponse.json(
        { error: "Image does not exist in the S3 bucket." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existing = await HomeDisplayPicture.findOne();

    if (existing) {
      existing.image = profilePictureKey;
      existing.alt = alt;
      await existing.save();
    } else {
      await HomeDisplayPicture.create({
        image: profilePictureKey,
        alt,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Portfolio profile picture updated successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating portfolio picture:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
