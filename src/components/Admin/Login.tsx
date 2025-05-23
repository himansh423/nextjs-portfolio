import { borderColor, fontColor } from "@/library/constants/colors";
import { racingSans } from "@/library/constants/fonts";
import { ArrowRight, Key, KeyRound, MailIcon } from "lucide-react";

const Login = () => {
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
        className={`w-[500px]  rounded-[10px] border-[1px] ${borderColor.primary} shadow-2xl flex flex-col px-5 py-4`}
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
              className={`flex-1 h-full  px-2 focus:outline-none`}
              placeholder="admin@example.com"
            />
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
              className={`flex-1 h-full  px-2 focus:outline-none`}
              placeholder="********"
            />
          </div>
        </div>
        <button
          className={`w-full h-[40px] bg-black flex items-center justify-center text-[#fafafa] mt-5 rounded-[5px] gap-1 text-[14px]`}
        >
          <p>Sign In</p>
          <div>
            <ArrowRight className="mt-[3px] " size={17} />
          </div>
        </button>
        <div className="w-full mt-5 h-[60px] flex gap-1 items-start justify-center">
<p>Forgot Password?</p><span className="text-blue-500"> click here</span>
        </div>
      </form>
    </div>
  );
};

export default Login;
