import connectToDatabase from "@/library/database/db";
import HomePhotoGallery from "@/library/model/home-page/HomePhotoGallerySchema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { imageUrls } = await req.json();

    if (!imageUrls || !Array.isArray(imageUrls)) {
      return NextResponse.json(
        { error: "Image URLs array is required" },
        { status: 400 }
      );
    }

    // Create one document per image
    const insertedDocs = await HomePhotoGallery.insertMany(
      imageUrls.map((url: string) => ({ image: url }))
    );

    return NextResponse.json({
      success: true,
      message: "Images uploaded and saved successfully.",
      images: insertedDocs, // contains _id and image
    });
  } catch (error) {
    console.error("Error saving photo gallery:", error);
    return NextResponse.json(
      { error: "Failed to save photo gallery." },
      { status: 500 }
    );
  }
}
