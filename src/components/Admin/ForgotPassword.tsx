import { borderColor, fontColor } from "@/library/constants/colors";
import { racingSans } from "@/library/constants/fonts";
import { ArrowLeft, ArrowRight, Lock, Mail } from "lucide-react";

const ForgotPassword = () => {
  return (
    <div className="w-full h-screen flex flex-col gap-3 items-center justify-center">
      <div className="flex flex-col gap-1 items-center">
        <p
          className={`text-[40px] ${racingSans.className} ${fontColor.primary}`}
        >
          Forgot Password
        </p>
        <p>Enter your email to reset your password</p>
      </div>
      <form
        className={`w-[500px]  rounded-[10px] border-[1px] ${borderColor.primary} shadow-2xl flex flex-col px-5 py-4`}
      >
        <div>
          <p className={`text-[25px] font-bold ${fontColor.primary}`}>
            Reset Password
          </p>
          <p className={` text-[14px] ${fontColor.secondry}`}>
            We'll send a verification code to your email address
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
              className={`flex-1 h-full  px-2 focus:outline-none  text-[14px]`}
              placeholder="admin@example.com"
            />
          </div>
        </div>

        <button
          className={`w-full h-[40px] bg-black flex items-center justify-center text-[#fafafa] mt-5 rounded-[5px] gap-1 text-[14px] font-semibold`}
        >
          <p>Send Reset Code</p>
          <div>
            <ArrowRight className="mt-[2px] " size={17} />
          </div>
        </button>
        <button
          className={`w-full h-[40px] bg-black flex items-center justify-center text-[#fafafa] mt-5 rounded-[5px] gap-1 text-[14px] font-semibold`}
        >
          <div>
            <ArrowLeft className="mt-[2px] " size={17} />
          </div>
          <p>Back To Login</p>
          
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
