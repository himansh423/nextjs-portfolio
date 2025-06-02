import { NextRequest, NextResponse } from "next/server";
import {
  S3Client,
  HeadObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
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

async function deleteFileFromS3(key: string): Promise<boolean> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: key,
    });
    await s3Client.send(command);
    console.log(`Successfully deleted file: ${key}`);
    return true;
  } catch (error) {
    console.error(`Failed to delete file from S3: ${key}`, error);
    return false;
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { dpFileKey } = await req.json();

    if (!dpFileKey) {
      return NextResponse.json(
        { error: "dpFileKey is required." },
        { status: 400 }
      );
    }

    // Validate new file exists in S3
    const isValid = await validateFileInS3(dpFileKey);
    if (!isValid) {
      return NextResponse.json(
        { error: "New image does not exist in the S3 bucket." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existing = await HomeDisplayPicture.findOne();

    // If there's an existing record, delete the old image from S3
    if (existing && existing.image) {
      const oldImageKey = existing.image;

      // Only delete if it's different from the new image
      if (oldImageKey !== dpFileKey) {
        console.log(`Attempting to delete old image: ${oldImageKey}`);
        const deleteSuccess = await deleteFileFromS3(oldImageKey);

        if (!deleteSuccess) {
          console.warn(
            `Failed to delete old image: ${oldImageKey}, but continuing with update`
          );
          // Continue anyway - don't fail the entire operation
        }
      }

      // Update existing record
      existing.image = dpFileKey;
      await existing.save();
    } else {
      // Create new record
      await HomeDisplayPicture.create({
        image: dpFileKey,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Profile picture updated successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating profile picture:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
