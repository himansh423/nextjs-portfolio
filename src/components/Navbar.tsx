"use client";
import { borderColor } from "@/library/constants/colors";
import { navbarActions } from "@/redux/navbarSlice";
import { RootState } from "@/redux/store";
import { Github, Twitter, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiLinkedin } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {  useEffect } from "react";
import clsx from "clsx";


const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
  { href: "/techbox", label: "Techbox" },
];

const Navbar = () => {
  const { tab, IsMobNav } = useSelector((store: RootState) => store.navbar);
  
  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    const validTabs = new Set(NAV_LINKS.map((link) => link.href));
    if (validTabs.has(pathname)) {
      dispatch(navbarActions.setTab(pathname));
    } else {
      dispatch(navbarActions.setTab(""));
    }
  }, [pathname, dispatch]);

  

  return (
    <>
      {/* mobile nav */}
      <nav
        className={`sm:hidden w-full h-[64px] border-b-[1px] relative ${borderColor.primary} px-3 flex justify-between items-center`}
      >
        <div className="w-[32px] h-[32px] bg-black"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="38"
          height="38"
          viewBox="0 0 38 38"
          onClick={() => dispatch(navbarActions.setIsMobNav(true))}
        >
          <circle
            cx="19"
            cy="19"
            r="18.5"
            fill="none"
            stroke="#D1D5DB"
            strokeWidth="1"
          />
          {/* Top line - longest */}
          <line
            x1="12"
            y1="13"
            x2="26"
            y2="13"
            stroke="black"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Middle line - medium */}
          <line
            x1="14"
            y1="19"
            x2="26"
            y2="19"
            stroke="black"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Bottom line - shortest */}
          <line
            x1="16"
            y1="25"
            x2="26"
            y2="25"
            stroke="black"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        {IsMobNav ? (
          <div
            className={`w-screen h-screen bg-[#f7f7f8]  top-0 left-0 z-50 fixed flex flex-col gap-6 items-start px-3`}
          >
            <div className="w-full h-[64px] flex justify-between items-center">
              <div className="w-[32px] h-[32px] bg-black"></div>
              <div
                onClick={() => dispatch(navbarActions.setIsMobNav(false))}
                className={`w-[38px] h-[38px] rounded-full flex justify-center items-center border-[1px] ${borderColor.primary}`}
              >
                <X size={20} />
              </div>
            </div>
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                onClick={() => dispatch(navbarActions.setIsMobNav(false))}
                key={href}
                href={href}
                className={clsx(
                  "transition-all text-[20px] font-semibold",
                  tab === href
                    ? "text-[#0f172a]"
                    : "text-[#6b7280] hover:text-[#0f172a] "
                )}
              >
                {label}
              </Link>
            ))}
          </div>
        ) : null}
      </nav>
      {/* mobile nav */}
      <nav
        className={clsx(
          "w-full h-[64px] flex justify-between items-center px-4 border-b-[1px] border-x-[1px] max-sm:hidden",
          borderColor.primary
        )}
      >
        {/* Logo */}
        <div className="Logo w-[30px] h-[30px] bg-black" />

        {/* Center Navigation */}
        <div
          className={clsx(
            "absolute w-[400px] h-[37px] left-1/2 -translate-x-1/2 flex gap-4 rounded-[30px] border-[1px] text-[14px] px-4 justify-center items-center font-medium",
            borderColor.primary
          )}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "transition-all",
                tab === href
                  ? "text-[#0f172a]"
                  : "text-[#6b7280] hover:text-[#0f172a]"
              )}
            >
              {label}
            </Link>
          ))}
        </div>

      
        {/* Social Icons */}
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
      </nav>
    </>
  );
};

export default Navbar;
