"use client";
import { borderColor, fontColor } from "@/library/constants/colors";
import { racingSans } from "@/library/constants/fonts";
import { motion } from "framer-motion";
import Image from "next/image";
const BlogSection = () => {
  return (
    <div className="w-full min-h-screen mt-14">
      <div
        className={`w-full border-y-[1px]  text-center text-[#4f46ef] text-[14px] font-semibold ${borderColor.primary} shadow-xs`}
      >
        <p>Blog</p>
      </div>
      <div
        className={`w-full border-y-[1px]  text-center ${fontColor.primary} text-[36px] font-semibold ${borderColor.primary} mt-7 px-[340px] ${racingSans.className} leading-[40px] shadow-xs`}
      >
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.5,
            ease: "easeOut",
          }}
        >
          I like sharing my experiments && knowledge with others
        </motion.p>
      </div>

      <div
        className={`w-full h-[515px] border-y-[1px] ${borderColor.primary} mt-18 flex justify-between items-center gap-2`}
      >
        <div
          className={`w-1/3 h-full  px-2 py-2 flex flex-col items-center rounded-3xl ${borderColor.primary} border-[1px]`}
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
                I've been working hard on my website, and I'm pumped to show you
                what I've been up to this year. From new features to some
                behind-the-scenes tech magic, there's a lot to unpack in this
                2024 update.
              </p>
            </div>
          </div>
        </div>
        <div
          className={`w-1/3 h-full  px-2 py-2 flex flex-col items-center rounded-3xl ${borderColor.primary} border-[1px]`}
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
                I've been working hard on my website, and I'm pumped to show you
                what I've been up to this year. From new features to some
                behind-the-scenes tech magic, there's a lot to unpack in this
                2024 update.
              </p>
            </div>
          </div>
        </div>        
        <div
          className={`w-1/3 h-full  px-2 py-2 flex flex-col items-center rounded-3xl ${borderColor.primary} border-[1px]`}
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
                I've been working hard on my website, and I'm pumped to show you
                what I've been up to this year. From new features to some
                behind-the-scenes tech magic, there's a lot to unpack in this
                2024 update.
              </p>
            </div>
          </div>
        </div>      </div>
    </div>
  );
};

export default BlogSection;
