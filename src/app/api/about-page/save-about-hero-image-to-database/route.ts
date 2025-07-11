import connectToDatabase from "@/library/database/db";
import AboutHeroImage from "@/library/model/about-page/AboutHeroImage";
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
    const insertedDocs = await AboutHeroImage.insertMany(
      imageUrls.map((url: string) => ({ image: url }))
    );

    return NextResponse.json({
      success: true,
      message: "Images uploaded and saved successfully.",
      images: insertedDocs, // contains _id and image
    });
  } catch (error) {
    console.error("Error saving about hero image:", error);
    return NextResponse.json(
      { error: "Failed to save about hero image." },
      { status: 500 }
    );
  }
}
