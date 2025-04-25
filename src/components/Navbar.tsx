import { borderColor, fontColor } from "@/library/constants/colors";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav
      className={`w-full h-[64px] flex justify-between relative items-center px-4 border-b-[1px] border-x-[1px] ${borderColor.primary}`}
    >
      <div className="Logo w-[30px] h-[30px] bg-black"></div>

      <div
        className={`navigations absolute w-[400px] h-[37px] left-1/2 -translate-x-1/2 flex gap-4 rounded-[30px] border-[1px]   text-[14px]  ${borderColor.primary} text-[14px] px-4 justify-center items-center font-medium`}
      >
        <Link href="/" className={`${fontColor.primary} hover:${fontColor.primary} transition-all`}>
          Home
        </Link>
        <Link
          href="/about"
          className={`${fontColor.secondry} hover:${fontColor.primary} transition-all`}
        >
          About
        </Link>
        <Link
          href="/projects"
          className={`${fontColor.secondry} hover:${fontColor.primary} transition-all`}
        >
          Projects
        </Link>
        <Link
          href="/contact"
          className={`${fontColor.secondry} hover:${fontColor.primary} transition-all`}
        >
          Contact
        </Link>
        <Link
          href="/blog"
          className={`${fontColor.secondry} hover:${fontColor.primary} transition-all`}
        >
          Blog
        </Link>
        <Link
          href="/techbox"
          className={`${fontColor.secondry} hover:${fontColor.primary} transition-all`}
        >
          Techbox
        </Link>
      </div>

      <div className="Links w-[103px] h-[36px] bg-red-600"></div>
    </nav>
  );
};

export default Navbar;
