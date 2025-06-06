import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/library/database/db";
import { sendEmail } from "@/library/sendMail/sendMail";
import User from "@/library/model/UserSchema";

export async function POST(req: Request) {
  await connectToDatabase();
  const { email } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = await bcrypt.hash(resetToken, 10);

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
  await user.save();

  const resetLink = `${process.env.FRONTEND_URL}/admin/auth/reset-password?token=${resetToken}&email=${email}`;
  await sendEmail({
    to: process.env.DEFAULT_ADMIN_EMAIL as string,
    subject: "Password Reset Link From Admin",
    text: `Click here to reset your password: ${resetLink}`,
    html: `<p>Click here to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
  });

  return NextResponse.json({
    success: true,
    message: "Password reset email sent",
  });
}
