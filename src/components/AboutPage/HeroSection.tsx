import { borderColor, fontColor } from "@/library/constants/colors";
import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <div
      className={`w-full h-[300px] border-b-[1px] ${borderColor.primary} flex items-center `}
    >
      <div
        className={`w-full h-[150px] border-y-[1px] ${borderColor.primary} flex px-[100px]`}
      >
        <div className="flex flex-col">
          <p className={`text-[14px] font-semibold text-[#4f46ef]`}>
            Good afternoon
          </p>
          <p
            className={`text-[50px] leading-[60px] ${fontColor.primary} font-bold`}
          >
            I'm Himanshu, a creative <br /> Full Stack Developer.
          </p>
        </div>
        <div className="flex-1 h-full   relative">
          <div
            className={`w-[145px] absolute top-[-15px] left-[40px] h-[145px] bg-red-500 -rotate-6 z-10 rounded-lg hover:-rotate-3 hover:scale-110 duration-300 overflow-hidden`}
          >
            <div className={`w-full h-full relative`}>
<Image src={"/cardimg1.jpg"} alt="imgofcard" fill objectFit="cover"/>
            </div>
          </div>
          <div
            className={`w-[145px] absolute translate-y-[-50%] top-[50%]  translate-x-[-50%] left-[50%] h-[145px] rounded-lg z-20 rotate-6 bg-violet-600 hover:rotate-3 hover:scale-110 duration-300 overflow-hidden`}
          >
            <div className={`w-full h-full relative`}>
<Image src={"/cardimg2.jpg"} alt="imgofcard" fill objectFit="cover"/>
            </div>
          </div>
          <div
            className={`w-[145px] absolute bottom-[-15px] right-[40px] h-[145px] bg-yellow-500 -rotate-3 rounded-lg z-10 hover:rotate-6 hover:scale-110 duration-300 overflow-hidden`}
          >
            <div className={`w-full h-full relative`}>
<Image src={"/cardimg5.jpg"} alt="imgofcard" fill objectFit="cover"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
