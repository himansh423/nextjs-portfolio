import { z } from "zod";

export const VerifyOTPSchema = z.object({
  otp: z
    .string()
    .min(6, "OTP must be exactly 6 characters long")
    .max(6, "OTP must be exactly 6 characters long"),
});
