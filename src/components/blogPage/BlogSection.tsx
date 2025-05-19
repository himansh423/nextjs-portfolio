"use client";
import { borderColor, fontColor } from "@/library/constants/colors";

import Image from "next/image";
const BlogSection = () => {
  return (
    <div className="w-full min-h-screen mt-14">
      <div
        className={`w-full min-h-screen border-y-[1px] ${borderColor.primary} mt-18 grid grid-cols-3  gap-2`}
      >
        {/* first */}
        {Array.from({ length: 18 }).map((_, index) => (
          <div
            key={index}
            className={`w-full h-[515px]  px-2 py-2 flex flex-col items-center rounded-3xl ${borderColor.primary} border-[1px] bg-[#FFFFFF] `}
          >
            <div
              className={`w-full h-[225px]  rounded-2xl ${borderColor.primary} border-[1px] relative overflow-hidden`}
            >
              <Image src={"/pexels.jpg"} alt="blog" fill objectFit="cover" />
            </div>
            <div className="innerContent flex-1 mt-4 w-full p-[10px] px-[20px]">
              <div className="w-full h-full  flex flex-col gap-3">
                <p className={`text-[18px] ${fontColor.primary} font-semibold`}>
                  Introducing Blogfolio V5
                </p>
                <p className={`text-[16px] ${fontColor.secondry} `}>
                  I&apos;ve been working hard on my website, and I&apos;m pumped to show
                  you what I&apos;ve been up to this year. From new features to some
                  behind-the-scenes tech magic, there&apos;s a lot to unpack in this
                  2024 update.
                </p>
              </div>
            </div>
          </div>
        ))}
        {/* first */}
      </div>
    </div>
  );
};

export default BlogSection;
