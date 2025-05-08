"use client";

import { borderColor, fontColor } from "@/library/constants/colors";
import { racingSans } from "@/library/constants/fonts";
import { aboutMoreActions } from "@/redux/aboutMoreSlice";
import { RootState } from "@/redux/store";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

const MoreSection = () => {
  const { isMovieBoxEntered,isStatsBoxEntered } = useSelector(
    (store: RootState) => store.aboutMore
  );
  const dispatch = useDispatch();
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
          <motion.div
            onHoverStart={() =>
              dispatch(aboutMoreActions.setIsMovieBoxEntered(true))
            }
            onHoverEnd={() =>
              dispatch(aboutMoreActions.setIsMovieBoxEntered(false))
            }
            className={`w-full  h-[300px]  rounded-xl ${borderColor.primary} border-[1px] bg-[#ffffff] p-[24px] relative overflow-hidden cursor-pointer`}
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
              <motion.div
                animate={{
                  y: isMovieBoxEntered ? -60 : 10,
                  width: isMovieBoxEntered ? "100px" : "150px",
                  height: isMovieBoxEntered ? "100px" : "150px",
                }}
                transition={{
                  duration: 0.4,
                }}
                className="w-[150px] h-[150px] absolute  rounded-full translate-x-[-50%] left-[50%]  overflow-hidden"
              >
                <div className="w-full h-full relative">
                  <Image
                    src={"/netflix.jpg"}
                    alt="bdf"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </motion.div>
              <div className="absolute w-[210px] h-[100px] overflow-hidden rounded-t-lg bg-black translate-x-[-50%] left-[50%] bottom-0">
                <div className="w-full h-full relative">
                  <Image
                    src={"/WalkingDead.jpg"}
                    layout="fill"
                    alt={"sjfb"}
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>

            {/* bluish overlay with gradient */}
            <motion.div
              animate={{
                display: isMovieBoxEntered ? "flex" : "hidden",
                opacity: isMovieBoxEntered ? 1 : 0,

                transition: { duration: 0.3 },
              }}
              className="absolute  w-full h-[100px] bottom-0 left-0 bg-gradient-to-br from-transparent via-[#EEF2FF]/6 to-[#C7D2FE]"
            />
            {/* bluish overlay with gradient */}
          </motion.div>
          {/* first column - first elem */}

          {/* first column - second elem */}
          <motion.div
          onHoverStart={() => dispatch(aboutMoreActions.setIsStatsBoxEntered(true))}
          onHoverEnd={() => dispatch(aboutMoreActions.setIsStatsBoxEntered(false))}
            className={`flex-1  bg-[#ffffff] rounded-xl border-[1px] ${borderColor.primary} gap-2 p-6 relative flex flex-col overflow-hidden`}
          >
            <div className="w-full flex gap-3 items-center">
              <p className={`text-[18px] ${fontColor.primary} font-semibold`}>
                Stats
              </p>
              <p
                className={`text-[12px] mt-[1px] ${fontColor.secondry} font-semibold`}
              >
                COMING SOON
              </p>
            </div>
            <div
              className={`flex-1  rounded-t-2xl flex items-end justify-center border-t-[1px] border-l-[1px] border-r-[1px]  ${borderColor.primary}`}
            >
              <div
                className={`w-[95%] h-[95%] rounded-t-xl  border-t-[1px] border-l-[1px] border-r-[1px] ${borderColor.primary} shadow-inner px-3 pt-2 bg-[#EDEEF0] flex flex-col`}
              >
                <div className="w-full flex justify-between items-center">
                  <p
                    className={`${fontColor.primary} font-semibold text-[9px]`}
                  >
                    Pageviews
                  </p>
                  <p
                    className={`${fontColor.secondry} font-semibold text-[7px]`}
                  >
                    LAST 30 DAYS
                  </p>
                </div>
                <div className="flex-1 flex justify-between items-end gap-2">
                  <div className="w-[25px] rounded-t-lg h-[70px] bg-[#6C47FF]"></div>
                  <div className="w-[25px] rounded-t-lg h-[80px] bg-[#6C47FF]"></div>
                  <div className="w-[25px] rounded-t-lg h-[100px] bg-[#6C47FF]"></div>
                  <div className="w-[25px] rounded-t-lg h-[70px] bg-[#6C47FF]"></div>
                  <div className="w-[25px] rounded-t-lg h-[97px] bg-[#6C47FF]"></div>
                  <div className="w-[25px] rounded-t-lg h-[90px] bg-[#6C47FF]"></div>
                  <div className="w-[25px] rounded-t-lg h-[90px] bg-[#6C47FF]"></div>
                </div>
              </div>
            </div>

            {/* overlay */}
            <div className="absolute h-full w-full bg-gradient-to-tr from-[#ffffff] via-[#ffffff]/10 to-transparent">
            <div className="absolute h-full w-full bg-gradient-to-tl from-[#ffffff] via-[#ffffff]/10 to-transparent"></div>

            </div>
            {/* overlay */}

            {/* bluish overlay with gradient */}
            <motion.div
              animate={{
                display: isStatsBoxEntered ? "flex" : "hidden",
                opacity: isStatsBoxEntered ? 1 : 0,

                transition: { duration: 0.3 },
              }}
              className="absolute  w-full h-[100px] bottom-0 left-0 bg-gradient-to-br from-transparent via-[#EEF2FF]/6 to-[#C7D2FE]"
            />
            {/* bluish overlay with gradient */}
          </motion.div>
          {/* first column - second elem */}
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
