"use client";

import { borderColor, fontColor } from "@/library/constants/colors";
import { racingSans } from "@/library/constants/fonts";
import { motion } from "framer-motion";

const MoreSection = () => {
  return (
    <div className="w-full min-h-screen mt-24 ">
      <div
        className={`w-full border-y-[1px]  text-center text-[#4f46ef] text-[14px] font-semibold ${borderColor.primary} shadow-xs`}
      >
        <p>More</p>
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
          Here's what sets me apart and makes me unique
        </motion.p>
      </div>

      <div
        className={`w-full border-y-[1px] mt-20 ${borderColor.primary} h-[530px] flex justify-between items-center gap-2`}
      >
        {/* first column */}
        <div className="w-[300px] h-full  flex flex-col gap-2">
          {/* first column - first elem */}
          <div
            className={`w-full  h-[300px]  rounded-xl ${borderColor.primary} border-[1px] bg-[#ffffff] p-[24px] relative overflow-hidden`}
          >
            <div className="w-full text-[16px] gap-2 flex flex-col ">
              <p className={`${fontColor.primary} font-semibold`}>
                Recent Favourite
              </p>
              <p className={`${fontColor.secondry}`}>
                I'm listening to The Sun Yet Shines by Bear McCreary from the
                album The Lord of the Rings: The Rings of Power
              </p>
            </div>
            <div className="w-full h-[150px]  absolute bottom-0 left-0">
              <div
                className={`w-[400px] h-[400px] absolute translate-x-[-50%] left-[50%] rounded-full border-[1px] ${borderColor.primary} flex items-center justify-center`}
              >
                <div
                  className={`w-[300px] h-[300px] absolute rounded-full border-[1px] ${borderColor.primary} flex items-center justify-center`}
                >
                  <div
                    className={`w-[200px] h-[200px] absolute rounded-full border-[1px] ${borderColor.primary} flex items-center justify-center`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          {/* first column - first elem */}
          <div
            className={`flex-1  bg-[#ffffff] rounded-xl border-[1px] ${borderColor.primary}`}
          ></div>
        </div>
        {/* first column */}

        {/* second column */}
        <div className="flex-1 h-full flex flex-col gap-2">
          <div
            className={`w-full h-[220px] bg-[#ffffff] rounded-xl border-[1px] ${borderColor.primary}`}
          ></div>
          <div
            className={`flex-1   bg-[#ffffff] rounded-xl border-[1px] ${borderColor.primary}`}
          ></div>
        </div>
        {/* second column */}

        {/* third column */}
        <div className="w-[195px] h-full bg-amber-900 rounded-xl"></div>
        {/* third column */}
      </div>
    </div>
  );
};

export default MoreSection;
