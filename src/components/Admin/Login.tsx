/* eslint-disable */
"use client";
import { borderColor, fontColor } from "@/library/constants/colors";
import { racingSans } from "@/library/constants/fonts";
import { LoginSchema } from "@/library/zodSchema/LoginSchema";
import { ArrowRight, KeyRound, MailIcon } from "lucide-react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { adminLoginActions } from "@/redux/AdminLoginSlice";
import Link from "next/link";

type LoginData = z.infer<typeof LoginSchema>;
const Login = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginData> = async (data: LoginData) => {
    try {
      const res = await axios.post("/api/auth/admin-login", data);
      if (res.data.success) {
        dispatch(adminLoginActions.setAdminEmail(res.data.email));
        router.push("/admin/auth/verify-otp");
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

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
      <div className="flex flex-col gap-1 items-center">
        <p
          className={`text-[40px] ${racingSans.className} ${fontColor.primary}`}
        >
          Admin Login
        </p>
        <p>Sign in to your admin account</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`w-[500px] max-sm:w-[85vw]  rounded-[10px] border-[1px] ${borderColor.primary} shadow-2xl flex flex-col px-5 py-4`}
      >
        <div>
          <p className={`text-[25px] font-bold ${fontColor.primary}`}>
            Admin Login
          </p>
          <p className={` text-[14px] ${fontColor.secondry}`}>
            Enter your credentials to continue
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
              <MailIcon className={`${fontColor.secondry}`} />
            </div>

            <input
              type="email"
              id="email"
              {...register("email")}
              disabled={isSubmitting}
              className={`flex-1 h-full  px-2 focus:outline-none`}
              placeholder="admin@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-2">
          <label
            htmlFor="email"
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
              type="password"
              id="password"
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
        {errors.root && (
          <p className="text-red-500 text-sm mt-2 text-center">
            {errors.root.message}
          </p>
        )}
        <button
          className={`w-full h-[40px] bg-black flex items-center justify-center text-[#fafafa] mt-5 rounded-[5px] gap-1 text-[14px] font-semibold`}
        >
          {isSubmitting ? (
            <div className="w-[30px] h-[30px] rounded-full border-t-[3px] border-l-[3px]  border-white  animate-spin"></div>
          ) : (
            <>
              <p>Sign In</p>
              <div>
                <ArrowRight className="mt-[2px] " size={17} />
              </div>
            </>
          )}
        </button>
        <div className="w-full mt-5 h-[60px] flex gap-1 items-start justify-center">
          <p>Forgot Password?</p>
          <Link href={"/admin/auth/forgot-password"} className="text-blue-500">
            {" "}
            click here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
