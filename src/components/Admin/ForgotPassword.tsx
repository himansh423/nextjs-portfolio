"use client";
import { borderColor, fontColor } from "@/library/constants/colors";
import { racingSans } from "@/library/constants/fonts";
import { ForgotPasswordSchema } from "@/library/zodSchema/ForgotPasswordSchema";
import { forgotPasswordActions } from "@/redux/forgotPasswordSlice";
import { RootState } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

type ForgotPasswordData = z.infer<typeof ForgotPasswordSchema>;
const ForgotPassword = () => {
  const { isShowModal } = useSelector(
    (store: RootState) => store.forgotPassword
  );
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ForgotPasswordData>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    try {
      const res = await axios.post("/api/auth/forgot-password", data);
      if (res.data.success) {
        dispatch(forgotPasswordActions.setIsShowModal(true));
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";

      if (message.toLowerCase().includes("email")) {
        setError("email", {
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
          className={`w-[500px] max-sm:w-[85vw] rounded-[10px] border-[1px] ${borderColor.primary} shadow-2xl  text-center py-4 text-2xl font-semibold text-green-500`}
        >
          <p>Reset link sent to your email address </p>
        </div>
      ) : (
        <>
          {" "}
          <div className="flex flex-col gap-1 items-center">
            <p
              className={`text-[40px] ${racingSans.className} ${fontColor.primary}`}
            >
              Forgot Password
            </p>
            <p>Enter your email to reset your password</p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`w-[500px] max-sm:w-[85vw]  rounded-[10px] border-[1px] ${borderColor.primary} shadow-2xl flex flex-col px-5 py-4`}
          >
            <div>
              <p className={`text-[25px] font-bold ${fontColor.primary}`}>
                Reset Password
              </p>
              <p className={` text-[14px] ${fontColor.secondry}`}>
                We&apos;ll send a verification code to your email address
              </p>
            </div>
            <div className="mt-5 flex flex-col gap-2">
              <label
                htmlFor="email"
                className={`text-[16px] font-semibold ${fontColor.primary} `}
              >
                Email
              </label>
              <div
                className={`h-[40px] w-full flex items-center justify-center border-[1px] ${borderColor.primary} rounded-[5px]`}
              >
                <div className="w-[60px] h-full  flex items-center justify-center ">
                  <Mail className={`${fontColor.secondry}`} />
                </div>

                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  disabled={isSubmitting}
                  className={`flex-1 h-full  px-2 focus:outline-none  text-[14px]`}
                  placeholder="admin@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
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
              className={`w-full h-[40px] bg-black flex items-center justify-center text-[#fafafa] mt-5 cursor-pointer rounded-[5px] gap-1 text-[14px] font-semibold`}
            >
              {isSubmitting ? (
                <div className="w-[30px] h-[30px] rounded-full border-t-[3px] border-l-[3px]  border-white  animate-spin"></div>
              ) : (
                <>
                  <p>Send Reset Code</p>
                  <div>
                    <ArrowRight className="mt-[2px] " size={17} />
                  </div>
                </>
              )}
            </button>
            <Link
              href={"/admin/auth/login"}
              className={`w-full h-[40px] bg-black flex items-center justify-center text-[#fafafa] mt-5 rounded-[5px] gap-1 text-[14px] font-semibold`}
            >
              <div>
                <ArrowLeft className="mt-[2px] " size={17} />
              </div>
              <p>Back To Login</p>
            </Link>
          </form>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
