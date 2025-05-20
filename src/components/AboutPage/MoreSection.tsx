"use client";

import { borderColor, fontColor } from "@/library/constants/colors";
import { racingSans } from "@/library/constants/fonts";
import { aboutMoreActions } from "@/redux/aboutMoreSlice";
import { homeAboutActions } from "@/redux/homeAboutSlice";
import { RootState } from "@/redux/store";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

const MoreSection = () => {
  const {
    isMovieBoxEntered,
    isStatsBoxEntered,
    isExploringBoxEntered,
    isImageOneHovered,
    isImageThreeHovered,
    isImageFourHovered,
    isImageTwoHovered,
    isBookBoxHovered,
  } = useSelector((store: RootState) => store.aboutMore);

  const { isConnectionBoxHovering } = useSelector(
    (store: RootState) => store.homeAbout
  );
  const dispatch = useDispatch();
  return (
    <div className="w-full min-h-screen mt-24 ">
      <div
        className={`w-full border-y-[1px] text-center text-[#4f46ef] text-[14px] font-semibold ${borderColor.primary} shadow-xs`}
      >
        <p>More</p>
      </div>
      <div
        className={`w-full border-y-[1px] text-center ${fontColor.primary} text-[36px] font-semibold ${borderColor.primary} mt-7 px-[340px] ${racingSans.className} leading-[40px] shadow-xs max-small-l:px-50`}
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
          Here&apos;s what sets me apart and makes me unique
        </motion.p>
      </div>

      <div
        className={`w-full border-y-[1px] mt-20 ${borderColor.primary} h-[530px] flex justify-between items-center gap-2 max-md:flex-col max-md:h-fit max-md:px-3`}
      >
        {/* first column */}
        <div className="w-[300px] h-full flex flex-col gap-2 max-small-l:w-[230px] max-md:w-full">
          {/* first column - first elem */}
          <motion.div
            onHoverStart={() =>
              dispatch(aboutMoreActions.setIsMovieBoxEntered(true))
            }
            onHoverEnd={() =>
              dispatch(aboutMoreActions.setIsMovieBoxEntered(false))
            }
            className={`w-full h-[300px] rounded-xl ${borderColor.primary} border-[1px] bg-[#ffffff] p-[24px] relative overflow-hidden cursor-pointer`}
          >
            <div className="w-full text-[16px] gap-2 flex flex-col ">
              <p className={`${fontColor.primary} font-semibold`}>
                Recent Favourite
              </p>
              <p className={`${fontColor.secondry} max-small-l:text-ellipsis max-small-l:h-[97px] max-small-l:overflow-hidden`}>
                I&apos;m listening to The Sun Yet Shines by Bear McCreary from the
                album The Lord of the Rings: The Rings of Power
              </p>
            </div>
            <div className="w-full h-[150px] absolute bottom-0 left-0">
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
                className="w-[150px] h-[150px] absolute rounded-full translate-x-[-50%] left-[50%] overflow-hidden"
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
                display: isMovieBoxEntered ? "flex" : "none",
                opacity: isMovieBoxEntered ? 1 : 0,
                transition: { duration: 0.3 },
              }}
              className="absolute w-full h-[100px] bottom-0 left-0 bg-gradient-to-br from-transparent via-[#EEF2FF]/6 to-[#C7D2FE]"
            />
            {/* bluish overlay with gradient */}
          </motion.div>
          {/* first column - first elem */}

          {/* first column - second elem */}
          <motion.div
            onHoverStart={() =>
              dispatch(aboutMoreActions.setIsStatsBoxEntered(true))
            }
            onHoverEnd={() =>
              dispatch(aboutMoreActions.setIsStatsBoxEntered(false))
            }
            className={`flex-1 bg-[#ffffff] rounded-xl border-[1px] ${borderColor.primary} gap-2 p-6 relative flex flex-col overflow-hidden`}
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
              className={`flex-1 rounded-t-2xl flex items-end justify-center border-t-[1px] border-l-[1px] border-r-[1px] ${borderColor.primary}`}
            >
              <div
                className={`w-[95%] h-[95%] rounded-t-xl border-t-[1px] border-l-[1px] border-r-[1px] ${borderColor.primary} shadow-inner px-3 pt-2 bg-[#EDEEF0] flex flex-col`}
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
                display: isStatsBoxEntered ? "flex" : "none",
                opacity: isStatsBoxEntered ? 1 : 0,
                transition: { duration: 0.3 },
              }}
              className="absolute w-full h-[100px] bottom-0 left-0 bg-gradient-to-br from-transparent via-[#EEF2FF]/6 to-[#C7D2FE]"
            />
            {/* bluish overlay with gradient */}
          </motion.div>
          {/* first column - second elem */}
        </div>
        {/* first column */}

        {/* second column */}
        <div className="flex-1 h-full flex flex-col gap-2 max-small-l:w-[550px] max-md:w-full">
          {/* second column - first elem */}
          <motion.div
            onHoverStart={() =>
              dispatch(aboutMoreActions.setIsExploringBoxEntered(true))
            }
            onHoverEnd={() =>
              dispatch(aboutMoreActions.setIsExploringBoxEntered(false))
            }
            className={`w-full h-[220px] bg-[#ffffff] rounded-xl border-[1px] p-[24px] ${borderColor.primary} flex flex-col cursor-pointer relative`}
          >
            <p className={`${fontColor.primary} text-[16px] font-semibold`}>
              Currently Exploring
            </p>
            <div className={`flex justify-around items-center flex-1 relative`}>
              <motion.div
                animate={{
                  scale: isExploringBoxEntered ? 1.3 : 1,
                }}
                onHoverStart={() =>
                  dispatch(aboutMoreActions.setIsImageOneHovered(true))
                }
                onHoverEnd={() =>
                  dispatch(aboutMoreActions.setIsImageOneHovered(false))
                }
                className="w-[100px] h-[100px] relative max-small-l:w-[50px] max-small-l:h-[50px]"
                style={{ zIndex: isImageOneHovered ? 50 : 1 }}
              >
                <Image
                  src={"/javalogo.webp"}
                  alt="nwdc"
                  layout="fill"
                  objectFit="cover"
                />
                <AnimatePresence>
                  <motion.div
                    animate={{
                      display: isImageOneHovered ? "flex" : "none",
                      opacity: isImageOneHovered ? 1 : 0,
                    }}
                    className={`desc w-[100px] py-1 absolute bottom-[-60px] bg-white left-0 items-center justify-center rounded-xl ${borderColor.primary} border-[1px]`}
                    style={{ zIndex: 100 }}
                  >
                    <div
                      className={`w-[90px] h-[90%] left-0 rounded-lg ${borderColor.primary} bg-[#EDEEF0] border-[1px] flex items-center justify-center shadow-inner px-1`}
                    >
                      <p
                        className={`text-[12px] text-center ${fontColor.primary} font-semibold`}
                      >
                        Learning DSA using Java
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
              <motion.div
                animate={{
                  scale: isExploringBoxEntered ? 1.3 : 1,
                }}
                onHoverStart={() =>
                  dispatch(aboutMoreActions.setIsImageTwoHovered(true))
                }
                onHoverEnd={() =>
                  dispatch(aboutMoreActions.setIsImageTwoHovered(false))
                }
                className="w-[100px] h-[100px] relative max-small-l:w-[50px] max-small-l:h-[50px]"
                style={{ zIndex: isImageTwoHovered ? 50 : 1 }}
              >
                <Image
                  src={"/gologo.png"}
                  alt="nwdc"
                  layout="fill"
                  objectFit="cover"
                />
                <motion.div
                  animate={{
                    display: isImageTwoHovered ? "flex" : "none",
                    opacity: isImageTwoHovered ? 1 : 0,
                  }}
                  className={`w-[100px] py-1 absolute bottom-[-60px] bg-white left-0 items-center justify-center rounded-xl ${borderColor.primary} border-[1px]`}
                  style={{ zIndex: 100 }}
                >
                  <div
                    className={`w-[90px] h-[90%] left-0 rounded-lg ${borderColor.primary} bg-[#EDEEF0] border-[1px] flex items-center justify-center shadow-inner px-1`}
                  >
                    <p
                      className={`text-[12px] text-center ${fontColor.primary} font-semibold`}
                    >
                      Learning Go Language
                    </p>
                  </div>
                </motion.div>
              </motion.div>
              <motion.div
                animate={{
                  scale: isExploringBoxEntered ? 1.3 : 1,
                }}
                onHoverStart={() =>
                  dispatch(aboutMoreActions.setIsImageThreeHovered(true))
                }
                onHoverEnd={() =>
                  dispatch(aboutMoreActions.setIsImageThreeHovered(false))
                }
                className="w-[100px] h-[100px] relative max-small-l:w-[50px] max-small-l:h-[50px]"
                style={{ zIndex: isImageThreeHovered ? 50 : 1 }}
              >
                <Image
                  src={"/perplexity.png"}
                  alt="nwdc"
                  layout="fill"
                  objectFit="cover"
                />
                <motion.div
                  animate={{
                    display: isImageThreeHovered ? "flex" : "none",
                    opacity: isImageThreeHovered ? 1 : 0,
                  }}
                  className={`w-[100px] py-1 absolute bottom-[-80px] bg-white left-0 items-center justify-center rounded-xl ${borderColor.primary} border-[1px]`}
                  style={{ zIndex: 100 }}
                >
                  <div
                    className={`w-[90px] h-[90%] left-0 rounded-lg ${borderColor.primary} bg-[#EDEEF0] border-[1px] flex items-center justify-center shadow-inner px-1`}
                  >
                    <p
                      className={`text-[12px] text-center ${fontColor.primary} font-semibold`}
                    >
                      Exploring more about Perplexity
                    </p>
                  </div>
                </motion.div>
              </motion.div>
              <motion.div
                animate={{
                  scale: isExploringBoxEntered ? 1.3 : 1,
                }}
                onHoverStart={() =>
                  dispatch(aboutMoreActions.setIsImageFourHovered(true))
                }
                onHoverEnd={() =>
                  dispatch(aboutMoreActions.setIsImageFourHovered(false))
                }
                className="w-[100px] h-[100px] relative max-small-l:w-[50px] max-small-l:h-[50px]"
                style={{ zIndex: isImageFourHovered ? 50 : 1 }}
              >
                <Image
                  src={"/cursor.png"}
                  alt="nwdc"
                  layout="fill"
                  objectFit="cover"
                />
                <motion.div
                  animate={{
                    display: isImageFourHovered ? "flex" : "none",
                    opacity: isImageFourHovered ? 1 : 0,
                  }}
                  className={`w-[100px] py-1 absolute bottom-[-60px] bg-white left-0 items-center justify-center rounded-xl ${borderColor.primary} border-[1px]`}
                  style={{ zIndex: 100 }}
                >
                  <div
                    className={`w-[90px] h-[90%] left-0 rounded-lg ${borderColor.primary} bg-[#EDEEF0] border-[1px] flex items-center justify-center shadow-inner px-1`}
                  >
                    <p
                      className={`text-[12px] text-center ${fontColor.primary} font-semibold`}
                    >
                      Polishing Cursor Skills{" "}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
          {/* second column - first elem */}

          {/* second column - second elem */}
          <motion.div
            onHoverStart={() =>
              dispatch(homeAboutActions.setIsConnectionBoxHovering(true))
            }
            onHoverEnd={() =>
              dispatch(homeAboutActions.setIsConnectionBoxHovering(false))
            }
            className={`w-full h-[300px] rounded-2xl overflow-hidden border-[1px] ${borderColor.primary} relative flex flex-col items-center py-[20px] bg-[#ffffff] shadow-gray-300 cursor-pointer`}
          >
            {/* side blurs */}
            <div className="absolute w-[200px] z-10 h-full bottom-[26px] left-0 bg-gradient-to-r from-white via-white/8 to-transparent" />
            <div className="absolute w-[200px] h-full bottom-[26px] right-0 bg-gradient-to-r from-transparent z-10 via-white/8 to-white" />
            {/* side blurs */}

            <div className="flex items-center justify-center flex-shrink-0 relative">
              {/* profile Image */}
              <motion.div
                animate={{
                  borderColor: isConnectionBoxHovering ? "#4F46E5" : "",
                  transition: { duration: 0.3 },
                }}
                className={`-translate-x-[50%] left-[50%] absolute z-20 w-[120px] h-[120px] border-[1px] rounded-full ${borderColor.primary} flex items-center justify-center`}
              >
                <div
                  className={`w-[100px] h-[100px] border-[1px] rounded-full ${borderColor.primary} relative overflow-hidden shadow-inner`}
                >
                  <Image
                    src={"/Profile.jpg"}
                    alt="profileImage"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </motion.div>
              {/* profile image */}
              <div
                className={`w-[190px] h-[190px] border-[1px] rounded-full ${borderColor.primary} flex items-center justify-center relative`}
              >
                {/* small connections div */}
                <motion.div
                  animate={{
                    y: isConnectionBoxHovering ? 0 : -100,
                    opacity: isConnectionBoxHovering ? 1 : 0,
                    transition: { duration: 0.1 },
                  }}
                  className={`w-[35px] h-[35px] rounded-full absolute -translate-x-[50%] left-[50%] top-[-10px] flex justify-center items-center ${borderColor.primary} border-[1px]`}
                >
                  <div
                    className={`w-[30px] shadow-inner h-[30px] rounded-full border-[1px] ${borderColor.primary} relative overflow-hidden`}
                  >
                    <Image
                      src={"/Profile.jpg"}
                      alt="profileImage"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </motion.div>
                {/* small connections div */}
                <div
                  className={`w-[170px] bg-[#E9EAF1] shadow-inner h-[170px] border-[1px] rounded-full ${borderColor.primary}`}
                ></div>
              </div>
              <div
                className={`w-[190px] h-[190px] border-[1px] rounded-full ${borderColor.primary} flex items-center justify-center relative`}
              >
                {/* small connections div */}
                <motion.div
                  animate={{
                    y: isConnectionBoxHovering ? 0 : 100,
                    opacity: isConnectionBoxHovering ? 1 : 0,
                    transition: { duration: 0.4 },
                  }}
                  className={`w-[50px] h-[50px] rounded-full absolute left-0 bottom-[20px] flex justify-center items-center ${borderColor.primary} border-[1px]`}
                >
                  <div
                    className={`w-[40px] shadow-inner h-[40px] rounded-full border-[1px] ${borderColor.primary} relative overflow-hidden`}
                  >
                    <Image
                      src={"/Profile.jpg"}
                      alt="profileImage"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </motion.div>
                <motion.div
                  animate={{
                    y: isConnectionBoxHovering ? 0 : -100,
                    opacity: isConnectionBoxHovering ? 1 : 0,
                    transition: { duration: 0.2 },
                  }}
                  className={`w-[60px] h-[60px] rounded-full absolute right-[50px] top-[-10px] flex justify-center items-center ${borderColor.primary} border-[1px]`}
                >
                  <div
                    className={`w-[50px] shadow-inner h-[50px] rounded-full border-[1px] ${borderColor.primary} relative overflow-hidden`}
                  >
                    <Image
                      src={"/Profile.jpg"}
                      alt="profileImage"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </motion.div>
                {/* small connections div */}
                <div
                  className={`w-[170px] bg-[#E9EAF1] shadow-inner h-[170px] border-[1px] rounded-full ${borderColor.primary}`}
                ></div>
              </div>{" "}
              <div
                className={`w-[190px] h-[190px] border-[1px] rounded-full ${borderColor.primary} flex items-center justify-center relative`}
              >
                {/* small connections div */}
                <motion.div
                  animate={{
                    y: isConnectionBoxHovering ? 0 : 100,
                    opacity: isConnectionBoxHovering ? 1 : 0,
                    transition: { duration: 0.5 },
                  }}
                  className={`w-[70px] h-[70px] rounded-full absolute right-0 bottom-[20px] flex justify-center items-center ${borderColor.primary} border-[1px]`}
                >
                  <div
                    className={`w-[60px] shadow-inner h-[60px] rounded-full border-[1px] ${borderColor.primary} relative overflow-hidden`}
                  >
                    <Image
                      src={"/Profile.jpg"}
                      alt="profileImage"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </motion.div>
                {/* small connections div */}
                <div
                  className={`w-[170px] h-[170px] border-[1px] bg-[#E9EAF1] shadow-inner rounded-full ${borderColor.primary}`}
                ></div>
              </div>
              <div
                className={`w-[190px] h-[190px] border-[1px] rounded-full ${borderColor.primary} flex items-center justify-center relative`}
              >
                {/* small connections div */}
                <motion.div
                  animate={{
                    y: isConnectionBoxHovering ? 0 : -100,
                    opacity: isConnectionBoxHovering ? 1 : 0,
                    transition: { duration: 0.3 },
                  }}
                  className={`w-[40px] h-[40px] rounded-full absolute left-0 top-[20px] flex justify-center items-center ${borderColor.primary} border-[1px]`}
                >
                  <div
                    className={`w-[35px] shadow-inner h-[35px] rounded-full border-[1px] ${borderColor.primary} relative overflow-hidden`}
                  >
                    <Image
                      src={"/Profile.jpg"}
                      alt="profileImage"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </motion.div>
                {/* small connections div */}
                <div
                  className={`w-[170px] h-[170px] border-[1px] bg-[#E9EAF1] shadow-inner rounded-full ${borderColor.primary}`}
                ></div>
              </div>{" "}
            </div>
            <div className="w-full flex flex-col items-center">
              <p className={`text-[#000000] mb-[8px] font-semibold`}>
                Connections
              </p>
              <p className={`${fontColor.secondry}`}>
                Check out my favorite tech and spots around the globe.
              </p>
            </div>
            {/* arrow  */}
            <motion.div
              animate={{
                display: isConnectionBoxHovering ? "flex" : "none",
                opacity: isConnectionBoxHovering ? 1 : 0,
                y: isConnectionBoxHovering ? 0 : 10,
                transition: { duration: 0.3 },
              }}
              className="absolute flex items-center justify-center w-[40px] h-[40px] rounded-full bottom-[10px] right-[10px] bg-[#C7D2FE] z-40"
            >
              <ArrowUpRight className="text-[#4F46E5]" />
            </motion.div>
            {/* arrow  */}

            {/* bluish overlay with gradient */}
            <motion.div
              animate={{
                display: isConnectionBoxHovering ? "flex" : "none",
                opacity: isConnectionBoxHovering ? 1 : 0,
                transition: { duration: 0.3 },
              }}
              className="absolute w-full h-[100px] bottom-0 left-0 bg-gradient-to-br from-transparent via-[#EEF2FF]/3 to-[#C7D2FE] z-30"
            />
            {/* bluish overlay with gradient */}
          </motion.div>
          {/* second column - second elem */}
        </div>
        {/* second column */}

        {/* third column */}
        <motion.div
          onHoverStart={() =>
            dispatch(aboutMoreActions.setIsBookBoxHovered(true))
          }
          onHoverEnd={() =>
            dispatch(aboutMoreActions.setIsBookBoxHovered(false))
          }
          className={`w-[195px] h-full overflow-hidden bg-white rounded-xl relative pt-5 pl-4 ${borderColor.primary} border-[1px] cursor-pointer max-small-l:w-[150px] max-md:hidden`}
        >
          <p className={`${fontColor.primary} font-semibold text-[16px]`}>
            Currently Reading
          </p>

          {/* Image wrapper with tilt on hover */}
          <motion.div
            animate={{
              rotate: isBookBoxHovered ? -4 : 0,
            }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
            style={{
              transformOrigin: "bottom center",
            }}
            className="absolute w-[240px] bottom-[-10px] h-[450px] mt-4 ml-auto mr-[-60px] rounded-t-lg overflow-hidden shadow-lg right-[-60px]"
          >
            <Image
              src="/redrising.jpeg"
              alt="Currently Reading Book"
              layout="fill"
              objectFit="cover"
              objectPosition="left"
              className="rounded-lg"
            />
          </motion.div>
          {/* overlay */}
          <div className="absolute h-full w-full bg-gradient-to-tr from-[#ffffff] via-[#ffffff]/10 to-transparent"></div>
          {/* overlay */}

          {/* bluish overlay with gradient */}
          <motion.div
            animate={{
              display: isBookBoxHovered ? "flex" : "none",
              opacity: isBookBoxHovered ? 1 : 0,
              transition: { duration: 0.2 },
            }}
            className="absolute w-full h-[100px] bottom-0 left-0 bg-gradient-to-br from-transparent via-[#EEF2FF]/6 to-[#C7D2FE]"
          />
          {/* bluish overlay with gradient */}
        </motion.div>
      </div>
    </div>
  );
};

export default MoreSection;
