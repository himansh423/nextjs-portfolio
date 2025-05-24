import { borderColor, fontColor } from "@/library/constants/colors";
import { racingSans } from "@/library/constants/fonts";
import { ArrowRight, Key, KeyRound, MailIcon } from "lucide-react";

const ResetPassword = () => {
  return (
    <div className="w-full h-screen flex flex-col gap-3 items-center justify-center">
      <div className="flex flex-col gap-1 items-center">
        <p
          className={`text-[40px] ${racingSans.className} ${fontColor.primary}`}
        >
          Reset Password
        </p>
        <p>Create a new password for himanshuchau423@gmail.comt</p>
      </div>
      <form
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
              className={`flex-1 h-full  px-2 focus:outline-none`}
              placeholder="********"
            />
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
              type="confirmPassword"
              id="confirmPassword"
              className={`flex-1 h-full  px-2 focus:outline-none`}
              placeholder="********"
            />
          </div>
        </div>
        <button
          className={`w-full h-[40px] bg-black flex items-center justify-center text-[#fafafa] mt-5 rounded-[5px] gap-1 text-[14px] font-semibold`}
        >
          <p>Update Password</p>
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
