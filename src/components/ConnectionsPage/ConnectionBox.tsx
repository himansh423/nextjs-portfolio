"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { borderColor, fontColor } from "@/library/constants/colors";
const ConnectionBox = () => {
  return (
    <div
      className={`w-full grid place-items-center gap-y-14 grid-cols-8 grid-rows-2 mt-[50px]`}
    >
      {Array.from({ length: 16 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center gap-4 rounded-xl p-1"
        >
          <motion.div
            whileHover={{ y: -15, borderColor: "#4f46ef" }}
            transition={{ duration: 0.3 }}
            className={`w-[112px] h-[112px] rounded-2xl border-[1px] ${borderColor.primary} flex items-center justify-center relative`}
          >
            <div
              className={`w-[95px] bg-[#edeef0] h-[95px] rounded-xl border-[1px] border-[#A5AEB81F]/10 flex items-center justify-center`}
              style={{ boxShadow: "0px 2px 1.5px 0px #A5AEB852 inset" }}
            >
              <div className="w-[50px] h-[50px] bg-white rounded-lg overflow-hidden relative">
                <Image
                  src="/weeknd.jpg"
                  alt="next"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>

            <div className={`w-full h-[24px] bg-[#818CF8] absolute bottom-[-10px] rounded-[50px] left-0`}>
              <p className={`text-[#ffffff] text-[12px] font-semibold flex items-center justify-center pt-[3px]`}>Met on 12/04/25</p>
            </div>
          </motion.div>
          <p className={`text-[14px] ${fontColor.secondry}`}>Himanshu Chauhan</p>
        </div>
      ))}
    </div>
  );
};

export default ConnectionBox;
