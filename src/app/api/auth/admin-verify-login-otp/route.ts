import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import * as cookie from "cookie";
import connectToDatabase from "@/library/database/db";
import User from "@/library/model/UserSchema";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, message: "Email and OTP are required" },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email, otp });
    const role = "admin";

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid OTP or email" },
        { status: 400 }
      );
    }

    // Update the found user
    user.otp = undefined;
    await user.save();

    // Generate JWT token with essential information
    const token = jwt.sign(
      {
        userId: user._id,
        role: role,
        email: user.email,
      },
      JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json(
      { success: true, message: "OTP verified, Login Successful", role: role },
      { status: 200 }
    );

    //  token in the response cookie
    response.headers.set(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60, // 7 days
        sameSite: "strict",
        path: "/",
      })
    );

    return response;
  } catch (error) {
    console.error("Server Error:", error);
    if (error instanceof Error)
      return NextResponse.json(
        { success: false, message: "Server error", error: error.message },
        { status: 500 }
      );
  }
}
