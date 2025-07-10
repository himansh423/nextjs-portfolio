import connectToDatabase from "@/library/database/db";
import Subscriber from "@/library/model/SubscriberSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({
        success: false,
        message: "Email is required",
      });
    }

    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return NextResponse.json({
        success: false,
        message: "Email is already subscribed",
      });
    }
    const subscriber = new Subscriber({ email });
    await subscriber.save();
    return NextResponse.json({
      success: true,
      message: "Subscribed successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
