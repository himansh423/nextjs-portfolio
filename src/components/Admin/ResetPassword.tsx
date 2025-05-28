"use client";
import { borderColor, fontColor } from "@/library/constants/colors";
import { racingSans } from "@/library/constants/fonts";
import { ResetPasswordSchema } from "@/library/zodSchema/ResetPasswordSchema";
import { resetPasswordActions } from "@/redux/ResetPasswordSlice";
import { RootState } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ArrowRight, KeyRound } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
type ResetPasswordData = z.infer<typeof ResetPasswordSchema>;
const ResetPasswordForm = () => {
  const { isShowModal } = useSelector(
    (store: RootState) => store.resetPassword
  );
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ResetPasswordData>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordData> = async (
    data: ResetPasswordData
  ) => {
    const payload = {
      password: data.password,
      token,
      email,
    };
    try {
      const res = await axios.post("/api/auth/reset-password", payload);
      if (res.data.success) {
        dispatch(resetPasswordActions.setIsShowModal(true));
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      if (message.toLowerCase().includes("invalid")) {
        setError("confirmPassword", {
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
      {isShowModal ? (
        <div
          className={`w-[500px] h-[200px] flex items-center justify-center rounded-[10px] border-[1px] ${borderColor.primary} shadow-2xl flex-col gap-3  px-4`}
        >
          <p className={`text-[20px] font-semibold ${fontColor.primary}`}>
            Password Updated Successfully
          </p>
          <Link
            href="/admin/auth/login"
            className={`w-full h-[40px] bg-black flex items-center justify-center text-[#fafafa] rounded-[5px] gap-1 text-[14px] font-semibold`}
          >
            Go to Login Page <ArrowRight />
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-1 items-center">
            <p
              className={`text-[40px] ${racingSans.className} ${fontColor.primary}`}
            >
              Reset Password
            </p>
            <p>Create a new password</p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`w-[500px]  rounded-[10px] border-[1px] ${borderColor.primary} shadow-2xl flex flex-col px-5 py-4`}
          >
            <div>
              <p className={`text-[25px] font-bold ${fontColor.primary}`}>
                New Password
              </p>
              <p className={` text-[14px] ${fontColor.secondry}`}>
                Enter your new password below
              </p>
            </div>
            <div className="mt-5 flex flex-col gap-2">
              <label
                htmlFor="password"
                className={`text-[16px] font-semibold ${fontColor.primary} `}
              >
                New Password
              </label>
              <div
                className={`h-[40px] w-full flex items-center justify-center border-[1px] ${borderColor.primary} rounded-[5px]`}
              >
                <div className="w-[60px] h-full  flex items-center justify-center ">
                  <KeyRound className={`${fontColor.secondry}`} />
                </div>

                <input
                  type="newPassword"
                  id="newPassword"
                  {...register("password")}
                  disabled={isSubmitting}
                  className={`flex-1 h-full  px-2 focus:outline-none`}
                  placeholder="********"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-2">
              <label
                htmlFor="confirmPassword"
                className={`text-[16px] font-semibold ${fontColor.primary} `}
              >
                Password
              </label>
              <div
                className={`h-[40px] w-full flex items-center justify-center border-[1px] ${borderColor.primary} rounded-[5px]`}
              >
                <div className="w-[60px] h-full  flex items-center justify-center ">
                  <KeyRound className={`${fontColor.secondry}`} />
                </div>

                <input
                  {...register("confirmPassword")}
                  disabled={isSubmitting}
                  type="confirmPassword"
                  id="confirmPassword"
                  className={`flex-1 h-full  px-2 focus:outline-none`}
                  placeholder="********"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            {errors.root && (
              <p className="text-red-500 text-sm mt-2 text-center">
                {errors.root.message}
              </p>
            )}
            <button
              className={`w-full h-[40px] bg-black flex items-center justify-center text-[#fafafa] mt-5 rounded-[5px] gap-1 text-[14px] font-semibold`}
            >
              {isSubmitting ? (
                <p>Updating Password...</p>
              ) : (
                <p>Update Password</p>
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default function ResetPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Suspense fallback={<div className="text-black">Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
