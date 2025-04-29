"use client";
import { borderColor, fontColor } from "@/library/constants/colors";
import Image from "next/image";
import profileImg from "../../../public/Profile.jpg";
import PhotoGallery from "./PhotoCards";
import { racingSans } from "@/library/constants/fonts";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="w-full flex flex-col">
      {/* profile Box */}
      <div
        className={`w-full h-[250px] flex justify-center items-center border-b-[1px] ${borderColor.primary}`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            scale: { type: "spring", bounce: 0.5 },
          }}
          className={`w-[140px] h-[140px] rounded-full border-[1px] ${borderColor.primary} flex justify-center items-center mt-10`}
        >
          <div
            className={`w-[110px] h-[110px] rounded-full border-[1px] ${borderColor.primary} flex justify-center items-center`}
          >
            <div
              className={`w-[100px] h-[100px] rounded-full border-[1px] ${borderColor.primary} overflow-hidden relative`}
            >
              <Image
                src={profileImg.src}
                alt="profileImage"
                objectFit="cover"
                fill
              />
            </div>
          </div>
        </motion.div>
      </div>
      {/* profile Box */}

      {/* Hey Box */}
      <div
        className={`w-full py-2 flex justify-center px-[250px] text-center border-b-[1px] ${borderColor.primary}`}
      >
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.5,
            ease: "easeOut",
          }}
          className={`${fontColor.primary} ${racingSans.className} font-semibold text-6xl`}
        >
          Hey, I'm Himanshu! Welcome to my corner of the internet!
        </motion.p>
      </div>
      {/* Hey Box */}

      {/* description box */}
      <div
        className={`w-full flex items-center ${fontColor.secondry} text-center px-[250px] py-2 border-y-[1px] mt-7 ${borderColor.primary}`}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 1,
            ease: "easeOut",
          }}>
          I'm a Full Stack Developer with a love for design and a knack for
          tinkering. This site is intentionally over-engineered and serves as my
          playground for experimenting with new ideas and seeing what sticks!
        </motion.p>
      </div>
      {/* description box */}

      {/* Images Box */}
      <div>
        <PhotoGallery />
      </div>
      {/* Images Box */}
    </div>
  );
};

export default HeroSection;
