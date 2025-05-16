"use client";
import { borderColor } from "@/library/constants/colors";
import { navbarActions } from "@/redux/navbarSlice";
import { RootState } from "@/redux/store";
import { Github, Twitter } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiLinkedin } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
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
  const { tab } = useSelector((store: RootState) => store.navbar);
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
    <nav
      className={clsx(
        "w-full h-[64px] flex justify-between items-center px-4 border-b-[1px] border-x-[1px]",
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
  );
};

export default Navbar;
