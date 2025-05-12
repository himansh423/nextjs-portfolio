"use client";
import { borderColor, fontColor } from "@/library/constants/colors";
import Image from "next/image";
import { motion } from "framer-motion";

const LanguagesLibraryAndFrameworks = () => {
  return (
    <div className="w-full min-h-screen flex flex-col mt-10">
      <div
        className={`w-full border-y-[1px] text-center text-[#4f46ef] text-[14px] font-semibold ${borderColor.primary} shadow-xs`}
      >
        <p>Languages, Libraries & Frameworks</p>
      </div>

      <div
        className={`w-full grid place-items-center gap-y-14 grid-cols-8 grid-rows-2 ${borderColor.primary} border-y-[1px] mt-[50px]`}
      >
        {Array.from({ length: 16 }).map((_, index) => (
  <div key={index} className="flex flex-col items-center gap-2 rounded-xl p-1">
    <motion.div
      whileHover={{ y: -20, borderColor: "#4f46ef" }}
      transition={{ duration: 0.3 }}
      className={`w-[112px] h-[112px] rounded-xl border-[1px] ${borderColor.primary} flex items-center justify-center`}
      style={{ borderColor: "#A5AEB8" }} // fallback in case Tailwind border doesn't animate
    >
      <div
        className={`w-[98px] bg-[#edeef0] h-[98px] rounded-lg border-[1px] border-[#A5AEB81F]/10 flex items-center justify-center`}
        style={{ boxShadow: "0px 2px 1.5px 0px #A5AEB852 inset" }}
      >
        <div className="w-[50px] h-[50px] bg-white rounded-full relative">
          <Image
            src="/next.png"
            alt="next"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </motion.div>
    <p className={`text-[14px] ${fontColor.secondry}`}>Next.js {index}</p>
  </div>
))}

      </div>
    </div>
  );
};

export default LanguagesLibraryAndFrameworks;
