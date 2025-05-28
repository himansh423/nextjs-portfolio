import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/library/database/db";
import User from "@/library/model/UserSchema";
import { sendEmail } from "@/library/sendMail/sendMail";

export async function POST(req: Request) {
  await connectToDatabase();

  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 400 }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 400 }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    existingUser.otp = otp;
    await existingUser.save();

    // Send OTP email
    await sendEmail({
      to: email,
      subject: "OTP from Himanshu Chauhan - Portfolio",
      text: `Your OTP code is ${otp}, use it within 15 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>OTP Verification</h2>
          <p>Hello ${existingUser.email},</p>
          <p>Your OTP code is <strong>${otp}</strong>. Please use it within the next 15 minutes to verify your account.</p>
          <p>If you did not request this OTP, please ignore this email.</p>
          <br>
          <p>Thanks</p>
        </div>
      `,
    });

    // Set timeout for 2 minutes to expire OTP
    setTimeout(async () => {
      const userToExpire = await User.findOne({ email });

      if (userToExpire && userToExpire.otp !== undefined) {
        userToExpire.otp = undefined;
        await userToExpire.save();

        // Send OTP expired email
        await sendEmail({
          to: email,
          subject: "OTP Expired - Himanshu Chauhan - Portfolio",
          text: `Your OTP has expired. Please log in again to receive a new OTP.`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
              <h2>OTP Expired</h2>
              <p>Hello ${userToExpire.email},</p>
              <p>Your previous OTP has expired due to inactivity. Please log in again to receive a new OTP.</p>
              <br>
              <p>Thanks</p>
            </div>
          `,
        });
      }
    }, 2 * 60 * 1000); // 2 minutes in milliseconds

    const response = NextResponse.json({
      success: true,
      message: "OTP Sent to Registered Email ID Successfully",
      email: existingUser.email,
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
