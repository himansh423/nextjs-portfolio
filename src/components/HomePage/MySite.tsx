"use client";
import { borderColor, fontColor } from "@/library/constants/colors";
import { racingSans } from "@/library/constants/fonts";
import { homeMySiteActions } from "@/redux/homeMySiteSlice";
import { RootState } from "@/redux/store";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
const MySite = () => {
  const { isChangelogBoxHovering } = useSelector(
    (store: RootState) => store.homeMySite
  );
  const dispatch = useDispatch();
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
        <motion.div
          onHoverStart={() =>
            dispatch(homeMySiteActions.setIsChangeLogBoxHovering(true))
          }
          onHoverEnd={() =>
            dispatch(homeMySiteActions.setIsChangeLogBoxHovering(false))
          }
          className={`w-1/3 h-full  overflow-hidden   rounded-3xl ${borderColor.primary} border-[1px] relative`}
        >
          {/* changelog background */}
          <motion.div
            animate={{
              y: isChangelogBoxHovering ? -30 : 0,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            }}
            className="backgroundWithTags w-full h-[120%] relative overflow-hidden bg-[#FFFFFF]"
          >
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
          </motion.div>
          {/* changelog background */}
          {/* overlay */}
          <div
            className="absolute top-0
          left-0 w-full h-full z-20 bg-gradient-to-tr from-[#ffffff] via-[#ffffff]/20 to-transparent overflow-hidden "
          ></div>
          {/* overlay */}
          {/* changelog text */}
          <div
            className={`w-full h-full absolute top-0 left-0 z-30 bg-transparent flex justify-start items-end px-6 py-6`}
          >
            <div className="flex flex-col gap-2">
              <p className={`${fontColor.primary} text-[16px] font-semibold`}>
                Changelog
              </p>
              <p className={`${fontColor.secondry} text-[16px]`}>
                Here's what's new on <br />
                my site
              </p>
            </div>
          </div>
          {/* changelog text */}

          {/* bluish overlay */}
          {/* arrow  */}
          <motion.div
            animate={{
              display: isChangelogBoxHovering ? "flex" : "hidden",
              opacity: isChangelogBoxHovering ? 1 : 0,
              y: isChangelogBoxHovering ? 0 : 10,
              transition: { duration: 0.3 },
            }}
            className="absolute hidden  items-center justify-center w-[40px] h-[40px] rounded-full bottom-[20px] right-[15px] bg-[#C7D2FE] z-30"
          >
            <ArrowUpRight className="text-[#4F46E5]" />
          </motion.div>
          {/* arrow  */}

          {/* bluish overlay with gradient */}
          <motion.div
            animate={{
              display: isChangelogBoxHovering ? "flex" : "hidden",
              opacity: isChangelogBoxHovering ? 1 : 0,

              transition: { duration: 0.3 },
            }}
            className="absolute  w-full h-[100px] bottom-0 left-0 bg-gradient-to-br from-transparent via-[#EEF2FF]/6 to-[#C7D2FE]"
          />
          {/* bluish overlay with gradient */}
          {/* bluish overlay */}
        </motion.div>
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
