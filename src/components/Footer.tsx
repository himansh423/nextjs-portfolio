"use client";
import { borderColor, fontColor } from "@/library/constants/colors";
import { Github, Twitter } from "lucide-react";
import { CiLinkedin } from "react-icons/ci";
import sidelines from "../../public/sideLines.jpg";
import axios from "axios";
import { LoggedInActions } from "@/redux/LoggedInSlice";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Footer = () => {
  const { isAdminLoggedIn, isUserLoggedIn } = useSelector(
    (store: RootState) => store.loggedIn
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/auth/decode-token");
        if (response.data?.success) {
          if (response.data.user.role === "admin") {
            dispatch(LoggedInActions.setIsAdminLoggedIn(true));
          } else if (response.data.user.role === "user") {
            dispatch(LoggedInActions.setIsUserLoggedIn(true));
          }
        }
      } catch (error) {
        console.error("Error fetching logged-in user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    const res = await axios.post("/api/auth/logout");

    if (res.data.success) {
      window.location.reload();
    }
  };
  return (
    <footer>
      <div
        className={`w-full h-[240px] border-[1px] ${borderColor.primary} flex max-md:flex-col max-md:h-fit max-md:px-3 max-md:border-0 max-md:border-t-[1px]`}
      >
        <div
          className={`w-1/2 h-full px-20 py-9 flex justify-between border-r-[1px] ${borderColor.primary} max-md:border-r-0 max-md: w-full max-md:border-b-[1px] max-sm:px-2`}
        >
          <div className={`flex flex-col gap-6 max-small-l:gap-2`}>
            <div className="Logo w-[40px] h-[40px] bg-black"></div>
            <p className={`text-[14px] ${fontColor.secondry} font-semibold`}>
              I&apos;m Himanshu - a senior Full-Stack <br /> Developer, blogger
              and <br /> Streamer. Thanks for checking out my site!
            </p>
            <p className={`text-[14px] font-semibold ${fontColor.secondry}`}>
              © 2025 Himanshu Chauhan
            </p>
          </div>

          <div className="flex items-end">
            <div className="Links w-[103px] rounded-[30px] h-[37px] bg-[#3c3c3f] flex items-center gap-2 justify-center">
              <a
                href="https://x.com/Himansh423"
                target="_main"
                className="text-gray-300 hover:text-white"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/himanshu-chauhan423/"
                target="_main"
                className="text-gray-300 hover:text-white"
              >
                <CiLinkedin size={22} />
              </a>
              <a
                href="https://github.com/himansh423"
                target="_main"
                className="text-gray-300 hover:text-white"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>
        <div
          className={`w-1/2 h-full px- py-9 flex  items-center justify-center gap-10 shrink-0 max-small-l:gap-2 max-md:justify-around max-md:w-full`}
        >
          <div
            className={`w-[150px] h-[200px]  flex flex-col gap-3 max-sm:w-fit`}
          >
            <p className={`text-[16px] font-semibold ${fontColor.primary}`}>
              General
            </p>
            <div
              className={`text-[14px] flex flex-col gap-2 ${fontColor.secondry}`}
            >
              <p>Home</p>
              <p>About</p>
              <p>Projects</p>
              <p>Contact</p>
              <p>Blog</p>
              {isAdminLoggedIn && (
                <p onClick={handleLogout} className="cursor-pointer">
                  Logout
                </p>
              )}
            </div>
          </div>
          <div
            className={`w-[150px] h-[200px]  flex flex-col gap-3 max-sm:w-fit`}
          >
            <p className={`text-[16px] font-semibold ${fontColor.primary}`}>
              Specifics
            </p>
            <div
              className={`text-[14px] flex flex-col gap-2 ${fontColor.secondry}`}
            >
              <p>Techbox</p>
              <p>Community Wall</p>
            </div>
          </div>
          <div
            className={`w-[150px] h-[200px]  flex flex-col gap-3 max-sm:w-fit`}
          >
            <p className={`text-[16px] font-semibold ${fontColor.primary}`}>
              Extras
            </p>
            <div
              className={`text-[14px] flex flex-col gap-2 ${fontColor.secondry}`}
            >
              <p>Changelog</p>
              <p>Connections</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="w-full h-[35px] bg-repeat-x bg-top"
        style={{
          backgroundImage: `url(${sidelines.src})`,
          backgroundSize: "contain",
        }}
      ></div>
    </footer>
  );
};

export default Footer;
