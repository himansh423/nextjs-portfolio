"use client";
import { borderColor, fontColor } from "@/library/constants/colors";
import { racingSans } from "@/library/constants/fonts";
import { homeMySiteActions } from "@/redux/homeMySiteSlice";
import { RootState } from "@/redux/store";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const MySite = () => {
  const { isChangelogBoxHovering, isMusicBoxHovering, isCommunityBoxHovering } =
    useSelector((store: RootState) => store.homeMySite);
  const dispatch = useDispatch();
  const bars = new Array(16).fill(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  return (
    <div className="w-full mt-14">
      <div
        className={`w-full border-y-[1px]  text-center text-[#4f46ef] text-[14px] font-semibold ${borderColor.primary} shadow-xs`}
      >
        <p>My Site</p>
      </div>
      <div
        className={`w-full border-y-[1px]  text-center ${fontColor.primary} text-[36px] font-semibold ${borderColor.primary} mt-7 px-[340px] ${racingSans.className} leading-[40px] shadow-xs max-small-l:px-[200px] max-md:px-[100px] max-sm:px-1 max-sm:text-[36px]`}
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
         Welcome to my digital playground — tinker, explore, and drop a hello!{" "}
        </motion.p>
      </div>
      <div
        className={`w-full h-[276px] ${borderColor.primary} border-y-[1px] mt-18 flex justify-between items-center gap-2 max-md:px-2 max-sm:flex-col max-sm:h-fit `}
      >
        <motion.div
          onHoverStart={() =>
            dispatch(homeMySiteActions.setIsChangeLogBoxHovering(true))
          }
          onHoverEnd={() =>
            dispatch(homeMySiteActions.setIsChangeLogBoxHovering(false))
          }
          onMouseMove={(e) =>
            setMousePos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })
          }
          className={`w-1/3 h-full  overflow-hidden   rounded-3xl ${borderColor.primary} border-[1px] relative max-md:hidden`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: isChangelogBoxHovering ? 1 : 0,
              x: mousePos.x,
              y: mousePos.y,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`absolute pointer-events-none px-4 py-2 text-white bg-gray-500 z-40 flex items-center justify-center rounded-md`}
          >
            <p>COMING SOON</p>
            <div className="w-[20px] absolute -bottom-2 h-[20px] bg-gray-500 rounded-full"></div>
          </motion.div>

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
            <div className="absolute z-10 w-[10px] h-full bg-gray-400 -translate-x-[50%] left-[50%] max-small-l:hidden"></div>
            {/* center line */}
            {/* tags */}
            <div
              className={`w-[160px] h-[54px] rounded-[10px] bg-[#F7F7F8] absolute left-[20px] top-[-10px] flex flex-col items-start justify-center px-3 ${borderColor.primary} border-[1px]`}
            >
              <p className={`${fontColor.secondry} text-[12px]`}>
                Bytefolio V1 is Now Live!
              </p>
              <p className={`${fontColor.secondry} text-[12px]`}>July, 2025</p>
              <span className="absolute right-[-25px] h-[1px] w-[25px] bg-gray-300"></span>
            </div>

            <div
              className={`w-[160px] h-[54px] rounded-[10px] bg-[#F7F7F8] absolute left-[20px] top-[110px] flex flex-col items-start justify-center px-3 ${borderColor.primary} border-[1px]`}
            >
              <p className={`${fontColor.secondry} text-[12px]`}>
                Bytefolio V1 is Now Live!
              </p>
              <p className={`${fontColor.secondry} text-[12px]`}>July, 2025</p>
              <span className="absolute right-[-25px] h-[1px] w-[25px] bg-gray-300"></span>
            </div>
            {/* -------------------------- */}
            <div
              className={`w-[160px] h-[54px] rounded-[10px] bg-[#F7F7F8] absolute right-[20px] top-[50px] flex flex-col items-start justify-center px-3 ${borderColor.primary} border-[1px]`}
            >
              <p className={`${fontColor.secondry} text-[12px]`}>
                Bytefolio V1 is Now Live!
              </p>
              <p className={`${fontColor.secondry} text-[12px]`}>July, 2025</p>
              <span className="absolute left-[-25px] h-[1px] w-[25px] bg-gray-300"></span>
            </div>

            <div
              className={`w-[160px] h-[54px] rounded-[10px] bg-[#F7F7F8] absolute right-[20px] top-[160px] flex flex-col items-start justify-center px-3 ${borderColor.primary} border-[1px] max-small-l:top-[170px]`}
            >
              <p className={`${fontColor.secondry} text-[12px]`}>
                Bytefolio V1 is Now Live!
              </p>
              <p className={`${fontColor.secondry} text-[12px]`}>July, 2025</p>
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
                Here&apos;s what&apos;s new on <br />
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
        <Link
          className={`w-1/3 h-full  px-2 py-2 rounded-3xl ${borderColor.primary} border-[1px] relative overflow-hidden bg-[#ffffff] cursor-pointer max-md:w-1/2 max-sm:h-[280px] max-sm:w-full`}
          href="/fav-music"
        >
          <motion.div
            onHoverStart={() =>
              dispatch(homeMySiteActions.setIsMusicBoxHovering(true))
            }
            onHoverEnd={() =>
              dispatch(homeMySiteActions.setIsMusicBoxHovering(false))
            }
            className={`w-full h-full`}
          >
            {/* circle background */}

            <div className="w-full h-full overflow-hidden absolute top-0 left-0">
              <motion.div
                animate={{
                  borderColor: isMusicBoxHovering ? "#4F46E5" : "#D6DADE",
                }}
                transition={{
                  duration: 0.7,
                  delay: isMusicBoxHovering ? 0.4 : 0.4,
                }}
                className={`w-[450px] h-[450px] border-[1px] rounded-full absolute -translate-x-[50%] left-[50%] top-[40px] flex items-center justify-center`}
              >
                <motion.div
                  animate={{
                    borderColor: isMusicBoxHovering ? "#4F46E5" : "#D6DADE",
                  }}
                  transition={{
                    duration: 0.6,
                    delay: isMusicBoxHovering ? 0.2 : 0.5,
                  }}
                  className={`w-[370px] h-[370px] border-[1px] rounded-full flex items-center justify-center`}
                >
                  <motion.div
                    animate={{
                      borderColor: isMusicBoxHovering ? "#4F46E5" : "#D6DADE",
                    }}
                    transition={{
                      duration: 0.5,
                      delay: isMusicBoxHovering ? 0.2 : 0.6,
                    }}
                    className={`w-[280px] h-[280px] border-[1px] rounded-full flex items-center justify-center`}
                  >
                    <motion.div
                      animate={{
                        borderColor: isMusicBoxHovering ? "#4F46E5" : "#D6DADE",
                      }}
                      transition={{
                        duration: 0.4,
                        delay: isMusicBoxHovering ? 0.1 : 0.7,
                      }}
                      className={`w-[180px] h-[180px] border-[1px] rounded-full`}
                    ></motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            {/* circle background */}

            {/* images */}
            <div className={`w-full h-full absolute top-0 left-0 `}>
              <div className="w-full flex justify-around">
                <motion.div
                  animate={{
                    y: isMusicBoxHovering ? -10 : 0,
                  }}
                  transition={{
                    delay: 0.2,
                  }}
                  className={`w-[76px] h-[76px] rounded-full  border-[1px] ${borderColor.primary} flex items-center justify-center mt-20 `}
                >
                  <div
                    className={`w-[70px] h-[70px] rounded-full border-[1px] ${borderColor.primary} shadow-inner relative overflow-hidden`}
                  >
                    <Image
                      src={"/kendric.jpg"}
                      alt={"musicSmallDiv"}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </motion.div>
                <motion.div
                  animate={{
                    y: isMusicBoxHovering ? -10 : 0,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className={`w-[117px] h-[117px] rounded-full   border-[1px] ${borderColor.primary} flex items-center justify-center mt-6 `}
                >
                  <div
                    className={`w-[110px] h-[110px] rounded-full   border-[1px] ${borderColor.primary} relative shadow-inner overflow-hidden`}
                  >
                    <Image
                      src={"/seedhemaut.jpg"}
                      alt={"musicSmallDiv"}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </motion.div>
                <motion.div
                  animate={{
                    y: isMusicBoxHovering ? -10 : 0,
                  }}
                  transition={{
                    duration: 0.289,
                  }}
                  className={`w-[76px] h-[76px] rounded-full  border-[1px] ${borderColor.primary} flex items-center justify-center mt-20 `}
                >
                  <div
                    className={`w-[70px] h-[70px] rounded-full border-[1px] ${borderColor.primary} shadow-inner relative overflow-hidden`}
                  >
                    <Image
                      src={"/krsna.jpg"}
                      alt={"musicSmallDiv"}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
            {/* images */}
            {/* overlay */}
            <div
              className="absolute top-0
          left-0 w-full h-full z-20 bg-gradient-to-tr from-[#ffffff] via-[#ffffff]/10 to-transparent overflow-hidden "
            ></div>
            <div
              className="absolute top-0
          left-0 w-full h-full z-30 bg-gradient-to-tl from-[#ffffff] via-[#ffffff]/10 to-transparent overflow-hidden "
            ></div>
            {/* overlay */}
            {/* music animation div */}
            <div className="absolute top-0 z-40 left-0 h-full w-full flex justify-center items-end py-20">
              <div className="w-[105px] h-[35px] rounded-3xl bg-[#F5F5F8] shadow-lg shadow-black/15 border border-gray-200 flex gap-[3px] items-center py-2 px-2 overflow-hidden justify-center">
                {bars.map((_, i) => (
                  <div
                    key={i}
                    className="bar"
                    style={{
                      height: "90%",
                      width: "2px",
                      backgroundColor: "#a0a0a0",
                      borderRadius: "1rem",
                      animation: isMusicBoxHovering
                        ? `scaleBar 1s ease-in-out infinite, waveColor 2s linear infinite`
                        : "",
                      animationDelay: isMusicBoxHovering
                        ? `${i * 0.1}s, ${i * 0.15}s`
                        : "",
                      transformOrigin: isMusicBoxHovering ? "center" : "",
                    }}
                  ></div>
                ))}
              </div>

              <style>{`
        @keyframes scaleBar {
          0%, 100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(1.4);
          }
        }

        @keyframes waveColor {
          0%, 100% {
            background-color: #4F46E5;
          }
          25% {
            background-color: #60a5fa; /* blue-400 */
          }
          50% {
            background-color: #4F46E5; /* blue-500 */
          }
          75% {
            background-color: #60a5fa;
          }
        }
      `}</style>
            </div>
            {/* music animation div */}

            {/* music text */}
            <div
              className={`w-full h-full absolute top-0 left-0 z-30 bg-transparent flex justify-start items-end px-6 py-6`}
            >
              <div className="flex flex-col gap-2">
                <p className={`${fontColor.primary} text-[16px] font-semibold`}>
                  Music
                </p>
                <p className={`${fontColor.secondry} text-[16px]`}>
                  Here&apos;s my Fav Artists <br />
                  and Songs
                </p>
              </div>
            </div>
            {/* music text */}

            {/* bluish overlay */}
            {/* arrow  */}
            <motion.div
              animate={{
                display: isMusicBoxHovering ? "flex" : "hidden",
                opacity: isMusicBoxHovering ? 1 : 0,
                y: isMusicBoxHovering ? 0 : 10,
                transition: { duration: 0.3 },
              }}
              className="absolute hidden  items-center justify-center w-[40px] h-[40px] rounded-full bottom-[20px] right-[15px] bg-[#C7D2FE] z-70"
            >
              <ArrowUpRight className="text-[#4F46E5]" />
            </motion.div>
            {/* arrow  */}

            {/* bluish overlay with gradient */}
            <motion.div
              animate={{
                display: isMusicBoxHovering ? "flex" : "hidden",
                opacity: isMusicBoxHovering ? 1 : 0,

                transition: { duration: 0.3 },
              }}
              className="absolute  w-full h-[100px] bottom-0 left-0 bg-gradient-to-br z-60 from-transparent via-[#EEF2FF]/6 to-[#C7D2FE]"
            />
            {/* bluish overlay with gradient */}
            {/* bluish overlay */}
          </motion.div>
        </Link>
        <Link href={"/community-wall"} className="w-1/3 h-full max-md:w-1/2 max-sm:h-[280px] max-sm:w-full">
          <motion.div
            onHoverStart={() =>
              dispatch(homeMySiteActions.setIsCommunityBoxHovering(true))
            }
            onHoverEnd={() =>
              dispatch(homeMySiteActions.setIsCommunityBoxHovering(false))
            }
            className={`w-full h-full  px-2 py-2 flex flex-col items-center rounded-3xl ${borderColor.primary} border-[1px] relative bg-[#ffffff] overflow-hidden `}
          >
            {/* background with cards */}
            <div className="w-full h-full absolute top-0 left-0  ">
              <motion.div
                animate={{
                  rotate: isCommunityBoxHovering ? -6 : -15,
                }}
                transition={{
                  duration: 0.289,
                }}
                className={`w-[115px] h-[140px] bg-white overflow-hidden rounded-md ${borderColor.primary} border-[1px] shadow-xl p-2  absolute top-[-20px] left-10`}
              >
                <div className="w-full h-[100px] bg-gradient-to-tr from-pink-500 via-purple-500/80 to-red-500 rounded-sm flex flex-col gap-1 items-center justify-center">
                  <div className="flex gap-1">
                    <div className="w-[40px] h-[10px] rounded-[20px] bg-[#ffffff]/40"></div>
                    <div className="w-[20px] rounded-[20px] h-[10px] bg-[#ffffff]/40"></div>
                  </div>
                  <div className="flex  gap-1">
                    <div className="w-[20px] rounded-[20px] h-[10px] bg-[#ffffff]/40"></div>
                    <div className="w-[40px] rounded-[20px] h-[10px] bg-[#ffffff]/40"></div>
                  </div>
                  <div className="flex  gap-1">
                    <div className="w-[40px] rounded-[20px] h-[10px] bg-[#ffffff]/40"></div>
                    <div className="w-[20px] rounded-[20px] h-[10px] bg-[#ffffff]/40"></div>
                  </div>
                </div>
                <div className="w-[20px] h-[20px] rounded-full bg-[#000]/20 mt-1 "></div>
              </motion.div>
              <motion.div
                animate={{
                  rotate: isCommunityBoxHovering ? 6 : 12,
                }}
                transition={{
                  delay: 0.15,
                  duration: 0.289,
                }}
                className={`w-[135px] h-[160px] bg-white overflow-hidden rounded-md ${borderColor.primary} border-[1px] shadow-xl p-2 rotate-12 absolute top-[30px] right-10`}
              >
                <div className="w-full h-[120px] bg-gradient-to-tr from-pink-500 via-purple-500/80 to-red-500 rounded-sm flex flex-col gap-1 items-center justify-center">
                  <div className="flex gap-1">
                    <div className="w-[40px] h-[10px] rounded-[20px] bg-[#ffffff]/40"></div>
                    <div className="w-[20px] rounded-[20px] h-[10px] bg-[#ffffff]/40"></div>
                  </div>
                  <div className="flex  gap-1">
                    <div className="w-[20px] rounded-[20px] h-[10px] bg-[#ffffff]/40"></div>
                    <div className="w-[40px] rounded-[20px] h-[10px] bg-[#ffffff]/40"></div>
                  </div>
                  <div className="flex  gap-1">
                    <div className="w-[40px] rounded-[20px] h-[10px] bg-[#ffffff]/40"></div>
                    <div className="w-[20px] rounded-[20px] h-[10px] bg-[#ffffff]/40"></div>
                  </div>
                </div>
                <div className="w-[20px] h-[20px] rounded-full bg-[#000]/20 mt-1 "></div>
              </motion.div>{" "}
            </div>
            {/* background with cards */}
            {/* overlay */}
            <div className="w-full h-full absolute top-0 left-0 z-10 bg-gradient-to-tr from-[#ffffff] via-[#ffffff]/40 to-transparent"></div>
            {/* overlay */}
            {/* text */}
            <div
              className={`w-full h-full absolute top-0 left-0 z-30 bg-transparent flex justify-start items-end px-6 py-6`}
            >
              <div className="flex flex-col gap-2">
                <p className={`${fontColor.primary} text-[16px] font-semibold`}>
                  Community Wall
                </p>
                <p className={`${fontColor.secondry} text-[16px]`}>
                  Let everyone know
                  <br />
                  you were here
                </p>
              </div>
            </div>{" "}
            {/* text */}
            {/* bluish overlay */}
            {/* arrow  */}
            <motion.div
              animate={{
                display: isCommunityBoxHovering ? "flex" : "hidden",
                opacity: isCommunityBoxHovering ? 1 : 0,
                y: isCommunityBoxHovering ? 0 : 10,
                transition: { duration: 0.3 },
              }}
              className="absolute hidden  items-center justify-center w-[40px] h-[40px] rounded-full bottom-[20px] right-[15px] bg-[#C7D2FE] z-70"
            >
              <ArrowUpRight className="text-[#4F46E5]" />
            </motion.div>
            {/* arrow  */}
            {/* bluish overlay with gradient */}
            <motion.div
              animate={{
                display: isCommunityBoxHovering ? "flex" : "hidden",
                opacity: isCommunityBoxHovering ? 1 : 0,

                transition: { duration: 0.3 },
              }}
              className="absolute  w-full h-[100px] bottom-0 left-0 bg-gradient-to-br z-60 from-transparent via-[#EEF2FF]/6 to-[#C7D2FE]"
            />
            {/* bluish overlay with gradient */}
            {/* bluish overlay */}
          </motion.div>
        </Link>
      </div>
    </div>
  );
};

export default MySite;
