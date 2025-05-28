"use client";
import { borderColor, fontColor } from "@/library/constants/colors";
import { racingSans } from "@/library/constants/fonts";
import { VerifyOTPSchema } from "@/library/zodSchema/VerifyOTP";
import { RootState } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ArrowRight, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { z } from "zod";

type OTPData = z.infer<typeof VerifyOTPSchema>;
const VerifyOtp = () => {
  const { adminEmail } = useSelector((store: RootState) => store.adminLogin);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<OTPData>({
    defaultValues: {
      otp: "",
    },
    resolver: zodResolver(VerifyOTPSchema),
  });

  const onSubmit: SubmitHandler<OTPData> = async (data: OTPData) => {
    const payload = {
      email: adminEmail,
      otp: data.otp,
    };
    try {
      const res = await axios.post("/api/auth/admin-verify-login-otp", payload);
      if (res.data.success) {
        router.push("/");
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      if (message.toLowerCase().includes("email")) {
        setError("otp", {
          type: "manual",
          message: message,
        });
      } else {
        setError("root", {
          type: "manual",
          message: message,
        });
      }
    }
  };

  return (
    <div className="w-full h-screen flex flex-col gap-3 items-center justify-center">
      <div className="flex flex-col gap-1 items-center">
        <p
          className={`text-[40px] ${racingSans.className} ${fontColor.primary}`}
        >
          Verify OTP
        </p>
        <p className="max-sm:text-center">
          Enter the verification code sent to Admin email
        </p>
      </div>
      <form
        className={`w-[500px] max-sm:w-[85vw] rounded-[10px] border-[1px] ${borderColor.primary} shadow-2xl flex flex-col px-5 py-4`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <p className={`text-[25px] font-bold ${fontColor.primary}`}>
            Enter Verification Code
          </p>
          <p className={` text-[14px] ${fontColor.secondry}`}>
            We've sent a 6-digit code to Admin Registered Email
          </p>
        </div>
        <div className="mt-5 flex flex-col gap-2">
          <label
            htmlFor="email"
            className={`text-[16px] font-semibold ${fontColor.primary} `}
          >
            Verification Code
          </label>
          <div
            className={`h-[40px] w-full flex items-center justify-center border-[1px] ${borderColor.primary} rounded-[5px]`}
          >
            <div className="w-[60px] h-full  flex items-center justify-center ">
              <Lock className={`${fontColor.secondry}`} />
            </div>

            <input
              type="text"
              id="otp"
              {...register("otp")}
              disabled={isSubmitting}
              className={`flex-1 h-full  px-2 focus:outline-none  text-[14px]`}
              placeholder="1 2 3 4 5 6"
            />
            {errors.otp && (
              <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
            )}
          </div>
        </div>
        {errors.root && (
          <p className="text-red-500 text-sm mt-2 text-center">
            {errors.root.message}
          </p>
        )}
        <button
          className={`w-full h-[40px] bg-black flex items-center justify-center text-[#fafafa] mt-5 cursor-pointer rounded-[5px] gap-1 text-[14px] font-semibold`}
        >
          {isSubmitting ? (
            <div className="w-[30px] h-[30px] rounded-full border-t-[3px] border-l-[3px]  border-white  animate-spin"></div>
          ) : (
            <>
              <p>Verify Code</p>
              <div>
                <ArrowRight className="mt-[2px] " size={17} />
              </div>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
