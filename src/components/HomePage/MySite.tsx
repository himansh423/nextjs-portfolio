"use client";
import { borderColor, fontColor } from "@/library/constants/colors";
import { racingSans } from "@/library/constants/fonts";
import { motion } from "framer-motion";
const MySite = () => {
  return (
    <div className="w-full min-h-screen mt-14">
      <div
        className={`w-full border-y-[1px]  text-center text-[#4f46ef] text-[14px] font-semibold ${borderColor.primary} shadow-xs`}
      >
        <p>My Site</p>
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
          My site is a playful sandbox. Explore, experiment, && say hello{" "}
        </motion.p>
      </div>
      <div
        className={`w-full h-[276px] ${borderColor.primary} border-y-[1px] mt-18 flex justify-between items-center gap-2`}
      >
        <div
          className={`w-1/3 h-full  overflow-hidden   rounded-3xl ${borderColor.primary} border-[1px] relative`}
        >
          <div className="absolute w-full h-full z-20 bg-gradient-to-tr from-[#ffffff] via-[#ffffff]/20 to-transparent overflow-hidden "></div>
          <div className="backgroundWithTags w-full h-full relative overflow-hidden bg-[#FFFFFF]">
            {/* center line */}
            <div className="absolute z-10 w-[10px] h-full bg-gray-400 -translate-x-[50%] left-[50%]"></div>
            {/* center line */}
            {/* tags */}
            <div
              className={`w-[160px] h-[54px] rounded-[10px] bg-[#F7F7F8] absolute left-[20px] top-[-10px] flex flex-col items-start justify-center px-3 ${borderColor.primary} border-[1px]`}
            >
              <p className={`${fontColor.secondry} text-[12px]`}>
                Blogfolio V5 is Now Live!
              </p>
              <p className={`${fontColor.secondry} text-[12px]`}>April, 2025</p>
              <span className="absolute right-[-25px] h-[1px] w-[25px] bg-gray-300"></span>
            </div>
            <div className="absolute w-[10px] h-full bg-gray-400 -translate-x-[50%] left-[50%]"></div>
            <div
              className={`w-[160px] h-[54px] rounded-[10px] bg-[#F7F7F8] absolute left-[20px] top-[110px] flex flex-col items-start justify-center px-3 ${borderColor.primary} border-[1px]`}
            >
              <p className={`${fontColor.secondry} text-[12px]`}>
                Blogfolio V5 is Now Live!
              </p>
              <p className={`${fontColor.secondry} text-[12px]`}>April, 2025</p>
              <span className="absolute right-[-25px] h-[1px] w-[25px] bg-gray-300"></span>
            </div>
            {/* -------------------------- */}
            <div
              className={`w-[160px] h-[54px] rounded-[10px] bg-[#F7F7F8] absolute right-[20px] top-[50px] flex flex-col items-start justify-center px-3 ${borderColor.primary} border-[1px]`}
            >
              <p className={`${fontColor.secondry} text-[12px]`}>
                Blogfolio V5 is Now Live!
              </p>
              <p className={`${fontColor.secondry} text-[12px]`}>April, 2025</p>
              <span className="absolute left-[-25px] h-[1px] w-[25px] bg-gray-300"></span>
            </div>

            <div
              className={`w-[160px] h-[54px] rounded-[10px] bg-[#F7F7F8] absolute right-[20px] top-[160px] flex flex-col items-start justify-center px-3 ${borderColor.primary} border-[1px]`}
            >
              <p className={`${fontColor.secondry} text-[12px]`}>
                Blogfolio V5 is Now Live!
              </p>
              <p className={`${fontColor.secondry} text-[12px]`}>April, 2025</p>
              <span className="absolute left-[-25px] h-[1px] w-[25px] bg-gray-300"></span>
            </div>

            {/* tags */}
          </div>
        </div>
        <div
          className={`w-1/3 h-full  px-2 py-2 flex flex-col items-center rounded-3xl ${borderColor.primary} border-[1px]`}
        ></div>
        <div
          className={`w-1/3 h-full  px-2 py-2 flex flex-col items-center rounded-3xl ${borderColor.primary} border-[1px]`}
        ></div>
      </div>
    </div>
  );
};

export default MySite;
