"use client";
import { borderColor, fontColor } from "@/library/constants/colors";
import type React from "react";
import { racingSans } from "@/library/constants/fonts";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Edit, Loader2, Plus, Upload } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { homeAboutActions } from "@/redux/homeAboutSlice";
import { useMediaQuery } from "@/library/hooks/use-media-query";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";

const AboutSection = () => {
  const {
    isAboutHovering,
    isTechBoxHovering,
    isConnectionBoxHovering,
    isCallBoxHovering,
  } = useSelector((store: RootState) => store.homeAbout);
  const { isAdminLoggedIn } = useSelector((store: RootState) => store.loggedIn);
  const dispatch = useDispatch();
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      setGreeting("Good morning");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  // State for about image
  const [aboutImage, setAboutImage] = useState<string | null>(null);
  const [aboutImageFile, setAboutImageFile] = useState<File | null>(null);
  const [aboutImagePreview, setAboutImagePreview] = useState<string | null>(
    null
  );
  const [isAboutImageLoading, setIsAboutImageLoading] = useState(false);
  const aboutImageInputRef = useRef<HTMLInputElement>(null);
  const [isLoadingAboutImage, setIsLoadingAboutImage] = useState(true);
  const [aboutImageDisplayLoading, setAboutImageDisplayLoading] =
    useState(true);

  // State for connections image
  const [connectionsImage, setConnectionsImage] = useState<string | null>(null);
  const [connectionsImageFile, setConnectionsImageFile] = useState<File | null>(
    null
  );
  const [connectionsImagePreview, setConnectionsImagePreview] = useState<
    string | null
  >(null);
  const [isConnectionsImageLoading, setIsConnectionsImageLoading] =
    useState(false);
  const connectionsImageInputRef = useRef<HTMLInputElement>(null);
  const [isLoadingConnectionsImage, setIsLoadingConnectionsImage] =
    useState(true);
  const [connectionsImageDisplayLoading, setConnectionsImageDisplayLoading] =
    useState(true);

  // State for tech stack images
  const [techImageLoadingStates, setTechImageLoadingStates] = useState<
    Map<string, boolean>
  >(
    new Map([
      ["react1", true],
      ["react2", true],
      ["next1", true],
      ["mongo", true],
      ["next2", true],
    ])
  );

  // State for connection profile images
  const [connectionImageLoadingStates, setConnectionImageLoadingStates] =
    useState<Map<string, boolean>>(
      new Map([
        ["profile1", true],
        ["profile2", true],
        ["yash", true],
        ["uday", true],
        ["profile3", true],
      ])
    );

  const calenderElements = [
    "SUN",
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
  ];

  const isMobile = useMediaQuery("(max-width: 780px)");

  // Fetch images on component mount
  useEffect(() => {
    fetchAboutImage();
    fetchConnectionsImage();
  }, []);

  // Handle file preview for about image
  useEffect(() => {
    if (aboutImageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAboutImagePreview(reader.result as string);
      };
      reader.readAsDataURL(aboutImageFile);
    }
  }, [aboutImageFile]);

  // Handle file preview for connections image
  useEffect(() => {
    if (connectionsImageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setConnectionsImagePreview(reader.result as string);
      };
      reader.readAsDataURL(connectionsImageFile);
    }
  }, [connectionsImageFile]);

  // Handle tech image load
  const handleTechImageLoad = (imageKey: string) => {
    setTechImageLoadingStates((prev) => {
      const newStates = new Map(prev);
      newStates.set(imageKey, false);
      return newStates;
    });
  };

  // Handle tech image error
  const handleTechImageError = (imageKey: string) => {
    setTechImageLoadingStates((prev) => {
      const newStates = new Map(prev);
      newStates.set(imageKey, false);
      return newStates;
    });
  };

  // Handle connection image load
  const handleConnectionImageLoad = (imageKey: string) => {
    setConnectionImageLoadingStates((prev) => {
      const newStates = new Map(prev);
      newStates.set(imageKey, false);
      return newStates;
    });
  };

  // Handle connection image error
  const handleConnectionImageError = (imageKey: string) => {
    setConnectionImageLoadingStates((prev) => {
      const newStates = new Map(prev);
      newStates.set(imageKey, false);
      return newStates;
    });
  };

  // Fetch about image
  const fetchAboutImage = async () => {
    try {
      setIsLoadingAboutImage(true);
      const response = await axios.get("/api/home-page/about-image/get");
      if (response.data.success) {
        setAboutImage(response.data.image);
      }
    } catch (error) {
      console.error("Error fetching about image:", error);
    } finally {
      setIsLoadingAboutImage(false);
    }
  };

  // Fetch connections image
  const fetchConnectionsImage = async () => {
    try {
      setIsLoadingConnectionsImage(true);
      const response = await axios.get("/api/home-page/connections-image/get");
      if (response.data.success) {
        setConnectionsImage(response.data.image);
      }
    } catch (error) {
      console.error("Error fetching connections image:", error);
    } finally {
      setIsLoadingConnectionsImage(false);
    }
  };

  // Handle about image file selection
  const handleAboutImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAboutImageFile(file);
    }
  };

  // Handle connections image file selection
  const handleConnectionsImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setConnectionsImageFile(file);
    }
  };

  // Upload about image
  const handleAboutImageUpload = async () => {
    if (!aboutImageFile) return;
    setIsAboutImageLoading(true);
    try {
      // Get presigned URL
      const { data } = await axios.post(
        "/api/home-page/about-image/get-presigned-url",
        {
          fileName: aboutImageFile.name,
          fileType: aboutImageFile.type,
        }
      );
      // Upload to S3
      await axios.put(data.uploadUrl, aboutImageFile, {
        headers: { "Content-Type": aboutImageFile.type },
      });
      // Save to database
      const res = await axios.post(
        "/api/home-page/about-image/save-to-database",
        {
          fileKey: data.fileKey,
        }
      );
      if (res.data.success) {
        await fetchAboutImage();
        setAboutImageFile(null);
        setAboutImagePreview(null);
        alert("About image updated successfully!");
      }
    } catch (error) {
      console.error("Error uploading about image:", error);
      alert("Failed to upload about image.");
    } finally {
      setIsAboutImageLoading(false);
    }
  };

  // Upload connections image
  const handleConnectionsImageUpload = async () => {
    if (!connectionsImageFile) return;
    setIsConnectionsImageLoading(true);
    try {
      // Get presigned URL
      const { data } = await axios.post(
        "/api/home-page/connections-image/get-presigned-url",
        {
          fileName: connectionsImageFile.name,
          fileType: connectionsImageFile.type,
        }
      );
      // Upload to S3
      await axios.put(data.uploadUrl, connectionsImageFile, {
        headers: { "Content-Type": connectionsImageFile.type },
      });
      // Save to database
      const res = await axios.post(
        "/api/home-page/connections-image/save-to-database",
        {
          fileKey: data.fileKey,
        }
      );
      if (res.data.success) {
        await fetchConnectionsImage();
        setConnectionsImageFile(null);
        setConnectionsImagePreview(null);
        alert("Connections image updated successfully!");
      }
    } catch (error) {
      console.error("Error uploading connections image:", error);
      alert("Failed to upload connections image.");
    } finally {
      setIsConnectionsImageLoading(false);
    }
  };

  return (
    <div>
      <div
        className={`w-full border-b-[1px]  text-center text-[#4f46ef] text-[14px] font-semibold ${borderColor.primary} shadow-xs`}
      >
        <p>About</p>
      </div>
      <div
        className={`w-full border-y-[1px]  text-center ${fontColor.primary} text-[36px] font-semibold ${borderColor.primary} mt-7 px-[340px]  ${racingSans.className} leading-[40px] shadow-xs max-small-l:px-[240px] max-md:px-[150px] max-sm:px-1 max-sm:text-[36px]`}
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
      {/* about grid */}
      {/* parent div */}
      <div
        className={`w-full overflow-hidden flex justify-between gap-2 items-center mt-20 border-y-[1px] ${borderColor.primary} max-md:flex-col max-md:px-2 `}
      >
        {/* child div1 */}
        <div className="w-[40%] flex flex-col gap-2 max-md:flex-row-reverse max-md:w-full max-sm:flex-col">
          {/* div1 - child div(i)*/}
          {isAdminLoggedIn ? (
            <motion.div
              onHoverStart={() =>
                dispatch(homeAboutActions.setIsAboutHovering(true))
              }
              onHoverEnd={() =>
                dispatch(homeAboutActions.setIsAboutHovering(false))
              }
              className={`w-full h-[220px] rounded-2xl border-[1px] ${borderColor.primary}   shadow-gray-300 flex bg-[#ffffff] justify-between p-[24px] cursor-pointer relative overflow-hidden max-md:w-[300px] max-md:h-[300px] max-sm:w-full max-sm:h-[250px]`}
            >
              <div className="flex flex-col text-[16px] w-[230px]">
                <p className={`text-[#000000] mb-[16px] font-semibold`}>
                  Learn more about me
                </p>
                <div className={`${fontColor.secondry}`}>
                  <p>{greeting}!</p>
                  <p>I&apos;m Himanshu, an Experienced Full Stack Developer.</p>
                </div>
              </div>
              <div className="flex-1 flex justify-center text-center relative">
                {/* backDiv */}
                <motion.div
                  animate={{
                    borderColor: isAboutHovering ? "#4F46E5" : "",
                    transition: { duration: 0.6 },
                  }}
                  className={`w-[185px] rounded-xl h-[290px] border-[1px] flex items-center justify-center ${borderColor.primary}  max-md:w-[150px] max-md:h-[255px]`}
                >
                  <div
                    className={`w-[165px] border-[1px] rounded-lg h-[270px] bg-[#E9EAF1]  ${borderColor.primary} max-md:w-[135px] max-md:h-[235px]`}
                  ></div>
                </motion.div>
                {/* imgDiv - overlay */}
                <motion.div
                  animate={{
                    rotate: isAboutHovering ? 8 : 12,
                    y: isAboutHovering ? -5 : 0,
                    scale: isAboutHovering ? 1.05 : 1,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  className={`w-[185px] rounded-xl h-[290px] border-[1px] flex items-center justify-center ${borderColor.primary} absolute  translate-x-[-50%]  left-[50%] top-0  overflow-hidden max-md:w-[150px] max-md:h-[255px]`}
                >
                  {" "}
                  <div className="w-full h-full relative overflow-hidden">
                    {(isLoadingAboutImage || aboutImageDisplayLoading) && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-200 z-10">
                        <Loader2
                          className="animate-spin text-gray-400"
                          size={32}
                        />
                      </div>
                    )}
                    {(aboutImagePreview || aboutImage) && (
                      <Image
                        src={
                          aboutImagePreview ||
                          aboutImage ||
                          "/placeholder.svg?height=290&width=185"
                        }
                        alt="profileImage"
                        layout="fill"
                        objectFit="cover"
                        onLoad={() => setAboutImageDisplayLoading(false)}
                        onError={() => setAboutImageDisplayLoading(false)}
                      />
                    )}
                  </div>
                </motion.div>
                {/* Admin Controls for About Image */}
                {isAdminLoggedIn && (
                  <div className="absolute top-[-20px] right-[-20px] z-30">
                    <div
                      className="w-[40px] h-[40px] rounded-full bg-blue-600 flex items-center justify-center cursor-pointer hover:bg-blue-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        aboutImageInputRef.current?.click();
                      }}
                    >
                      {aboutImage ? (
                        <Edit className="text-white" size={16} />
                      ) : (
                        <Plus className="text-white" size={16} />
                      )}
                    </div>
                    <input
                      type="file"
                      ref={aboutImageInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={handleAboutImageChange}
                    />
                  </div>
                )}
                {/* Upload Button (only visible when file is selected) */}
                {isAdminLoggedIn && aboutImageFile && (
                  <div className="absolute bottom-[-20px] right-[-20px] z-30">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAboutImageUpload();
                      }}
                      disabled={isAboutImageLoading}
                      className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 disabled:opacity-50 flex items-center gap-1"
                    >
                      {isAboutImageLoading ? (
                        <Loader2 className="animate-spin" size={12} />
                      ) : (
                        <Upload size={12} />
                      )}
                      {aboutImage ? "Update" : "Upload"}
                    </button>
                  </div>
                )}
              </div>
              {/* arrow  */}
              <motion.div
                animate={{
                  display: isAboutHovering ? "flex" : "hidden",
                  opacity: isAboutHovering ? 1 : 0,
                  y: isAboutHovering ? 0 : 10,
                  transition: { duration: 0.3 },
                }}
                className="absolute hidden  items-center justify-center w-[40px] h-[40px] rounded-full bottom-[10px] right-[10px] bg-[#C7D2FE] z-30"
              >
                <ArrowUpRight className="text-[#4F46E5]" />
              </motion.div>
              {/* arrow  */}
              {/* bluish overlay with gradient */}
              <motion.div
                animate={{
                  display: isAboutHovering ? "flex" : "hidden",
                  opacity: isAboutHovering ? 1 : 0,
                  transition: { duration: 0.3 },
                }}
                className="absolute  w-full h-[100px] bottom-0 left-0 bg-gradient-to-br from-transparent via-[#EEF2FF]/6 to-[#C7D2FE]"
              />
              {/* bluish overlay with gradient */}
            </motion.div>
          ) : (
            <Link href={"/about"}>
              <motion.div
                onHoverStart={() =>
                  dispatch(homeAboutActions.setIsAboutHovering(true))
                }
                onHoverEnd={() =>
                  dispatch(homeAboutActions.setIsAboutHovering(false))
                }
                className={`w-full h-[220px] rounded-2xl border-[1px] ${borderColor.primary}   shadow-gray-300 flex bg-[#ffffff] justify-between p-[24px] cursor-pointer relative overflow-hidden max-md:w-[300px] max-md:h-[300px] max-sm:w-full max-sm:h-[250px]`}
              >
                <div className="flex flex-col text-[16px] w-[230px]">
                  <p className={`text-[#000000] mb-[16px] font-semibold`}>
                    Learn more about me
                  </p>
                  <div className={`${fontColor.secondry}`}>
                    <p>Good afternoon!</p>
                    <p>
                      I&apos;m Himanshu, a Experienced Full Stack Developer.
                    </p>
                  </div>
                </div>
                <div className="flex-1 flex justify-center text-center relative">
                  {/* backDiv */}
                  <motion.div
                    animate={{
                      borderColor: isAboutHovering ? "#4F46E5" : "",
                      transition: { duration: 0.6 },
                    }}
                    className={`w-[185px] rounded-xl h-[290px] border-[1px] flex items-center justify-center ${borderColor.primary}  max-md:w-[150px] max-md:h-[255px]`}
                  >
                    <div
                      className={`w-[165px] border-[1px] rounded-lg h-[270px] bg-[#E9EAF1]  ${borderColor.primary} max-md:w-[135px] max-md:h-[235px]`}
                    ></div>
                  </motion.div>
                  {/* imgDiv - overlay */}
                  <motion.div
                    animate={{
                      rotate: isAboutHovering ? 8 : 12,
                      y: isAboutHovering ? -5 : 0,
                      scale: isAboutHovering ? 1.05 : 1,
                      transition: { duration: 0.3, ease: "easeOut" },
                    }}
                    className={`w-[185px] rounded-xl h-[290px] border-[1px] flex items-center justify-center ${borderColor.primary} absolute  translate-x-[-50%]  left-[50%] top-0  overflow-hidden max-md:w-[150px] max-md:h-[255px]`}
                  >
                    {" "}
                    <div className="w-full h-full relative overflow-hidden">
                      {(isLoadingAboutImage || aboutImageDisplayLoading) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 z-10">
                          <Loader2
                            className="animate-spin text-gray-400"
                            size={32}
                          />
                        </div>
                      )}
                      {(aboutImagePreview || aboutImage) && (
                        <Image
                          src={
                            aboutImagePreview ||
                            aboutImage ||
                            "/placeholder.svg?height=290&width=185"
                          }
                          alt="profileImage"
                          layout="fill"
                          objectFit="cover"
                          onLoad={() => setAboutImageDisplayLoading(false)}
                          onError={() => setAboutImageDisplayLoading(false)}
                        />
                      )}
                    </div>
                  </motion.div>
                </div>
                {/* arrow  */}
                <motion.div
                  animate={{
                    display: isAboutHovering ? "flex" : "hidden",
                    opacity: isAboutHovering ? 1 : 0,
                    y: isAboutHovering ? 0 : 10,
                    transition: { duration: 0.3 },
                  }}
                  className="absolute hidden  items-center justify-center w-[40px] h-[40px] rounded-full bottom-[10px] right-[10px] bg-[#C7D2FE] z-30"
                >
                  <ArrowUpRight className="text-[#4F46E5]" />
                </motion.div>
                {/* arrow  */}
                {/* bluish overlay with gradient */}
                <motion.div
                  animate={{
                    display: isAboutHovering ? "flex" : "hidden",
                    opacity: isAboutHovering ? 1 : 0,
                    transition: { duration: 0.3 },
                  }}
                  className="absolute  w-full h-[100px] bottom-0 left-0 bg-gradient-to-br from-transparent via-[#EEF2FF]/6 to-[#C7D2FE]"
                />
                {/* bluish overlay with gradient */}
              </motion.div>{" "}
            </Link>
          )}
          {/* div1 - child div(ii) */}
          <Link href={"/techbox"}>
            <motion.div
              onHoverStart={() =>
                dispatch(homeAboutActions.setIsTechBoxHovering(true))
              }
              onHoverEnd={() =>
                dispatch(homeAboutActions.setIsTechBoxHovering(false))
              }
              className={`w-full h-[300px] rounded-2xl  border-[1px] ${borderColor.primary} bg-[#ffffff] shadow-gray-300 py-[24px] flex flex-col justify-between cursor-pointer overflow-hidden relative max-md:flex-1 max-sm:w-full max-sm:text-center`}
            >
              <div className={` flex flex-col items-center text-[16px]`}>
                <p className={`text-[#000000] mb-[8px] font-semibold`}>
                  Techbox
                </p>
                <p className={`${fontColor.secondry}  max-sm:px-4 `}>
                  Check out my favorite tech and languages around the globe.
                </p>
              </div>
              <div className="flex w-full h-[150px] items-end justify-center gap-3  overflow-hidden">
                <motion.div
                  animate={{
                    y: isTechBoxHovering ? -20 : 0,
                    borderColor: isTechBoxHovering ? "#4F46E5" : "",
                    transition: { duration: 0.6 },
                  }}
                  className={`w-[120px] h-[120px] flex-shrink-0 rounded-[20px] border-[1px] ${borderColor.primary} flex justify-center items-center`}
                >
                  <div
                    className={`w-[100px] h-[100px] flex-shrink-0 rounded-[10px] border-[1px] border-[#A5AEB81F]/10 bg-[#E9EAF1]  flex items-center justify-center`}
                    style={{ boxShadow: "0px 2px 1.5px 0px #A5AEB852 inset" }}
                  >
                    <div className="w-[40px] h-[40px] bg-white rounded-full relative">
                      {techImageLoadingStates.get("react1") && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-full z-10">
                          <Loader2
                            className="animate-spin text-gray-400"
                            size={16}
                          />
                        </div>
                      )}
                      <Image
                        src="/react.png"
                        alt="react"
                        layout="fill"
                        objectFit="cover"
                        onLoad={() => handleTechImageLoad("react1")}
                        onError={() => handleTechImageError("react1")}
                      />
                    </div>
                  </div>
                </motion.div>{" "}
                <motion.div
                  animate={{
                    y: isTechBoxHovering ? -20 : 0,
                    borderColor: isTechBoxHovering ? "#4F46E5" : "",
                    transition: { ease: "easeIn", duration: 0.3 },
                  }}
                  className={`w-[120px] h-[120px] flex-shrink-0 rounded-[20px] border-[1px] ${borderColor.primary} flex justify-center items-center`}
                >
                  <div
                    className={`w-[100px] h-[100px] flex-shrink-0 rounded-[10px] border-[1px] ${borderColor.primary} bg-[#E9EAF1] shadow-inner flex items-center justify-center`}
                  >
                    <div className="w-[40px] h-[40px] bg-white rounded-full relative">
                      {techImageLoadingStates.get("react2") && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-full z-10">
                          <Loader2
                            className="animate-spin text-gray-400"
                            size={16}
                          />
                        </div>
                      )}
                      <Image
                        src="/react.png"
                        alt="react"
                        layout="fill"
                        objectFit="cover"
                        onLoad={() => handleTechImageLoad("react2")}
                        onError={() => handleTechImageError("react2")}
                      />
                    </div>
                  </div>
                </motion.div>
                {/* center div */}
                <motion.div
                  animate={{
                    y: isTechBoxHovering ? -20 : 0,
                    borderColor: isTechBoxHovering ? "#4F46E5" : "",
                    transition: { ease: "easeIn", duration: 0.4 },
                  }}
                  className={`w-[130px] h-[130px] flex-shrink-0 rounded-[20px] border-[1px] ${borderColor.primary} flex justify-center items-center`}
                >
                  <div
                    className={`w-[110px] h-[110px] flex-shrink-0 rounded-[10px] border-[1px] ${borderColor.primary} bg-[#E9EAF1] shadow-inner flex items-center justify-center`}
                  >
                    <div className="w-[50px] h-[50px] bg-white rounded-full relative">
                      {techImageLoadingStates.get("next1") && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-full z-10">
                          <Loader2
                            className="animate-spin text-gray-400"
                            size={20}
                          />
                        </div>
                      )}
                      <Image
                        src="/next.png"
                        alt="next"
                        layout="fill"
                        objectFit="cover"
                        onLoad={() => handleTechImageLoad("next1")}
                        onError={() => handleTechImageError("next1")}
                      />
                    </div>
                  </div>
                </motion.div>
                {/* center div */}
                <motion.div
                  animate={{
                    y: isTechBoxHovering ? -20 : 0,
                    borderColor: isTechBoxHovering ? "#4F46E5" : "",
                    transition: { ease: "easeIn", duration: 0.6 },
                  }}
                  className={`w-[120px] h-[120px] flex-shrink-0 rounded-[20px] border-[1px] ${borderColor.primary} flex justify-center items-center`}
                >
                  <div
                    className={`w-[100px] h-[100px] flex-shrink-0 rounded-[10px] border-[1px] ${borderColor.primary} bg-[#E9EAF1] shadow-inner flex items-center justify-center`}
                  >
                    <div className="w-[40px] h-[40px] bg-white rounded-full relative overflow-hidden">
                      {techImageLoadingStates.get("mongo") && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-full z-10">
                          <Loader2
                            className="animate-spin text-gray-400"
                            size={16}
                          />
                        </div>
                      )}
                      <Image
                        src="/mongo.jpg"
                        alt="mongo"
                        layout="fill"
                        objectFit="cover"
                        onLoad={() => handleTechImageLoad("mongo")}
                        onError={() => handleTechImageError("mongo")}
                      />
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  animate={{
                    y: isTechBoxHovering ? -20 : 0,
                    borderColor: isTechBoxHovering ? "#4F46E5" : "",
                    transition: { ease: "easeIn", duration: 0.6 },
                  }}
                  className={`w-[120px] h-[120px] flex-shrink-0 rounded-[20px] border-[1px] ${borderColor.primary} flex justify-center items-center`}
                >
                  <div
                    className={`w-[100px] h-[100px] flex-shrink-0 rounded-[10px] border-[1px] ${borderColor.primary} bg-[#E9EAF1] shadow-inner flex items-center justify-center`}
                  >
                    <div className="w-[40px] h-[40px] bg-white rounded-full relative">
                      {techImageLoadingStates.get("next2") && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-full z-10">
                          <Loader2
                            className="animate-spin text-gray-400"
                            size={16}
                          />
                        </div>
                      )}
                      <Image
                        src="/next.png"
                        alt="next"
                        layout="fill"
                        objectFit="cover"
                        onLoad={() => handleTechImageLoad("next2")}
                        onError={() => handleTechImageError("next2")}
                      />
                    </div>
                  </div>
                </motion.div>{" "}
              </div>
              <div className="absolute w-[80px] h-full bottom-[26px] left-0 bg-gradient-to-r from-white via-white/20 to-transparent" />
              <div className="absolute w-[80px] h-full bottom-[26px] right-0 bg-gradient-to-r from-transparent  via-white/20 to-white" />
              {/* arrow  */}
              <motion.div
                animate={{
                  display: isTechBoxHovering ? "flex" : "hidden",
                  opacity: isTechBoxHovering ? 1 : 0,
                  y: isTechBoxHovering ? 0 : 10,
                  transition: { duration: 0.3 },
                }}
                className="absolute hidden  items-center justify-center w-[40px] h-[40px] rounded-full bottom-[10px] right-[10px] bg-[#C7D2FE] z-30"
              >
                <ArrowUpRight className="text-[#4F46E5]" />
              </motion.div>
              {/* arrow  */}
              {/* bluish overlay with gradient */}
              <motion.div
                animate={{
                  display: isTechBoxHovering ? "flex" : "hidden",
                  opacity: isTechBoxHovering ? 1 : 0,
                  transition: { duration: 0.3 },
                }}
                className="absolute w-full h-[100px] bottom-0 left-0 bg-gradient-to-br from-transparent via-[#EEF2FF]/6 to-[#C7D2FE]"
              />
              {/* bluish overlay with gradient */}
            </motion.div>
          </Link>
        </div>
        {/* child div2 */}
        <div className="w-[60%] relative flex flex-col gap-2 items-center overflow-hidden max-md:w-full">
          {/* div2 -child div(i) */}
          {isAdminLoggedIn ? (
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
              <div className="absolute w-[200px] h-full bottom-[26px] right-0 bg-gradient-to-r from-transparent z-10  via-white/8 to-white" />
              {/* side blurs */}
              <div className="flex items-center  justify-center flex-shrink-0 relative  ">
                {/* profile Image */}
                <motion.div
                  animate={{
                    borderColor: isConnectionBoxHovering ? "#4F46E5" : "",
                    transition: { duration: 0.3 },
                  }}
                  className={` -translate-x-[50%]  left-[50%] absolute z-10 w-[120px] h-[120px] border-[1px]  rounded-full ${borderColor.primary} flex items-center justify-center`}
                >
                  <div
                    className={`w-[100px]  h-[100px] border-[1px]  rounded-full ${borderColor.primary} relative overflow-hidden shadow-inner`}
                  >
                    {(isLoadingConnectionsImage ||
                      connectionsImageDisplayLoading) && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-200 z-10">
                        <Loader2
                          className="animate-spin text-gray-400"
                          size={24}
                        />
                      </div>
                    )}
                    {(connectionsImagePreview || connectionsImage) && (
                      <Image
                        src={
                          connectionsImagePreview ||
                          connectionsImage ||
                          "/placeholder.svg?height=100&width=100"
                        }
                        alt="profileImage"
                        layout="fill"
                        objectFit="cover"
                        onLoad={() => setConnectionsImageDisplayLoading(false)}
                        onError={() => setConnectionsImageDisplayLoading(false)}
                      />
                    )}
                  </div>
                  {/* Admin Controls for Connections Image */}
                  {isAdminLoggedIn && (
                    <div className="absolute top-[-10px] right-[-10px] z-30">
                      <div
                        className="w-[30px] h-[30px] rounded-full bg-blue-600 flex items-center justify-center cursor-pointer hover:bg-blue-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          connectionsImageInputRef.current?.click();
                        }}
                      >
                        {connectionsImage ? (
                          <Edit className="text-white" size={12} />
                        ) : (
                          <Plus className="text-white" size={12} />
                        )}
                      </div>
                      <input
                        type="file"
                        ref={connectionsImageInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={handleConnectionsImageChange}
                      />
                    </div>
                  )}
                  {/* Upload Button (only visible when file is selected) */}
                  {isAdminLoggedIn && connectionsImageFile && (
                    <div className="absolute bottom-[-10px] right-[-10px] z-30">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConnectionsImageUpload();
                        }}
                        disabled={isConnectionsImageLoading}
                        className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 disabled:opacity-50 flex items-center gap-1"
                      >
                        {isConnectionsImageLoading ? (
                          <Loader2 className="animate-spin" size={12} />
                        ) : (
                          <Upload size={12} />
                        )}
                        {connectionsImage ? "Update" : "Upload"}
                      </button>
                    </div>
                  )}
                </motion.div>
                {/* profile image */}
                <div
                  className={`w-[190px] h-[190px] border-[1px]  rounded-full ${borderColor.primary} flex items-center justify-center relative `}
                >
                  {/* small connections div */}
                  <motion.div
                    animate={{
                      y: isMobile ? 0 : isConnectionBoxHovering ? 0 : -100,
                      opacity: isMobile ? 1 : isConnectionBoxHovering ? 1 : 0,
                      transition: { duration: 0.1 },
                    }}
                    className={`w-[35px] h-[35px]  rounded-full absolute -translate-x-[50%]  left-[50%]  top-[-10px] flex justify-center items-center ${borderColor.primary} border-[1px] `}
                  >
                    <div
                      className={`w-[30px] shadow-inner h-[30px] rounded-full border-[1px] ${borderColor.primary} relative overflow-hidden`}
                    >
                      {connectionImageLoadingStates.get("profile1") && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-full z-10">
                          <Loader2
                            className="animate-spin text-gray-400"
                            size={12}
                          />
                        </div>
                      )}
                      <Image
                        src="/suhani.jpg"
                        alt="profileImage"
                        layout="fill"
                        objectFit="cover"
                        onLoad={() => handleConnectionImageLoad("profile1")}
                        onError={() => handleConnectionImageError("profile1")}
                      />
                    </div>
                  </motion.div>
                  {/* small connections div */}
                  <div
                    className={`w-[170px] bg-[#E9EAF1] shadow-inner h-[170px] border-[1px]  rounded-full ${borderColor.primary}`}
                  ></div>
                </div>
                <div
                  className={`w-[190px] h-[190px] border-[1px]  rounded-full ${borderColor.primary} flex items-center justify-center relative `}
                >
                  {/* small connections div */}
                  <motion.div
                    animate={{
                      y: isMobile ? 0 : isConnectionBoxHovering ? 0 : 100,
                      opacity: isMobile ? 1 : isConnectionBoxHovering ? 1 : 0,
                      transition: { duration: 0.5 },
                    }}
                    className={`w-[50px] h-[50px]  rounded-full absolute   left-0 bottom-[20px] flex justify-center items-center ${borderColor.primary} border-[1px] `}
                  >
                    <div
                      className={`w-[40px] shadow-inner h-[40px] rounded-full border-[1px] ${borderColor.primary} relative overflow-hidden`}
                    >
                      {connectionImageLoadingStates.get("profile2") && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-full z-10">
                          <Loader2
                            className="animate-spin text-gray-400"
                            size={16}
                          />
                        </div>
                      )}
                      <Image
                        src="/chhavi.jpg"
                        alt="profileImage"
                        layout="fill"
                        objectFit="cover"
                        onLoad={() => handleConnectionImageLoad("profile2")}
                        onError={() => handleConnectionImageError("profile2")}
                      />
                    </div>
                  </motion.div>
                  <motion.div
                    animate={{
                      y: isMobile ? 0 : isConnectionBoxHovering ? 0 : -100,
                      opacity: isMobile ? 1 : isConnectionBoxHovering ? 1 : 0,
                      transition: { duration: 0.2 },
                    }}
                    className={`w-[60px] h-[60px]  rounded-full absolute   right-[50px] top-[-10px] flex justify-center items-center ${borderColor.primary} border-[1px] `}
                  >
                    <div
                      className={`w-[50px] shadow-inner h-[50px] rounded-full border-[1px] ${borderColor.primary} relative overflow-hidden`}
                    >
                      {connectionImageLoadingStates.get("yash") && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-full z-10">
                          <Loader2
                            className="animate-spin text-gray-400"
                            size={20}
                          />
                        </div>
                      )}
                      <Image
                        src="/yash.jpg"
                        alt="profileImage"
                        layout="fill"
                        objectFit="cover"
                        onLoad={() => handleConnectionImageLoad("yash")}
                        onError={() => handleConnectionImageError("yash")}
                      />
                    </div>
                  </motion.div>
                  {/* small connections div */}
                  <div
                    className={`w-[170px] bg-[#E9EAF1] shadow-inner h-[170px] border-[1px]  rounded-full ${borderColor.primary}`}
                  ></div>
                </div>{" "}
                <div
                  className={`w-[190px] h-[190px] border-[1px]  rounded-full ${borderColor.primary} flex items-center justify-center relative`}
                >
                  {/* small connections div */}
                  <motion.div
                    animate={{
                      y: isMobile ? 0 : isConnectionBoxHovering ? 0 : 100,
                      opacity: isMobile ? 1 : isConnectionBoxHovering ? 1 : 0,
                      transition: { duration: 0.5 },
                    }}
                    className={`w-[70px] h-[70px]  rounded-full absolute   right-0 bottom-[20px]  flex justify-center items-center ${borderColor.primary} border-[1px]  `}
                  >
                    <div
                      className={`w-[60px] shadow-inner h-[60px] rounded-full border-[1px] ${borderColor.primary} relative overflow-hidden`}
                    >
                      {connectionImageLoadingStates.get("uday") && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-full z-10">
                          <Loader2
                            className="animate-spin text-gray-400"
                            size={24}
                          />
                        </div>
                      )}
                      <Image
                        src="/uday.jpeg"
                        alt="profileImage"
                        layout="fill"
                        objectFit="cover"
                        onLoad={() => handleConnectionImageLoad("uday")}
                        onError={() => handleConnectionImageError("uday")}
                      />
                    </div>
                  </motion.div>
                  {/* small connections div */}
                  <div
                    className={`w-[170px] h-[170px] border-[1px] bg-[#E9EAF1] shadow-inner rounded-full ${borderColor.primary}`}
                  ></div>
                </div>
                <div
                  className={`w-[190px] h-[190px] border-[1px]  rounded-full ${borderColor.primary} flex items-center justify-center relative`}
                >
                  {/* small connections div */}
                  <motion.div
                    animate={{
                      y: isMobile ? 0 : isConnectionBoxHovering ? 0 : -100,
                      opacity: isMobile ? 1 : isConnectionBoxHovering ? 1 : 0,
                      transition: { duration: 0.3 },
                    }}
                    className={`w-[40px] h-[40px]  rounded-full absolute   left-0 top-[20px] flex justify-center items-center ${borderColor.primary} border-[1px]  `}
                  >
                    <div
                      className={`w-[35px] shadow-inner h-[35px] rounded-full border-[1px] ${borderColor.primary} relative overflow-hidden`}
                    >
                      {connectionImageLoadingStates.get("profile3") && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-full z-10">
                          <Loader2
                            className="animate-spin text-gray-400"
                            size={14}
                          />
                        </div>
                      )}
                      <Image
                        src="/ankit.jpg"
                        alt="profileImage"
                        layout="fill"
                        objectFit="cover"
                        onLoad={() => handleConnectionImageLoad("profile3")}
                        onError={() => handleConnectionImageError("profile3")}
                      />
                    </div>
                  </motion.div>
                  {/* small connections div */}
                  <div
                    className={`w-[170px] h-[170px] border-[1px] bg-[#E9EAF1] shadow-inner  rounded-full ${borderColor.primary}`}
                  ></div>
                </div>{" "}
              </div>
              <div className="w-full flex flex-col  items-center">
                <p className={`text-[#000000] mb-[8px] font-semibold`}>
                  Connections
                </p>
                <p
                  className={`${fontColor.secondry}  max-sm:px-16 max-sm:text-center `}
                >
                  An evolving list of people I&apos;ve met and those I wish to
                  meet.
                </p>
              </div>
              {/* arrow  */}
              <motion.div
                animate={{
                  display: isConnectionBoxHovering ? "flex" : "hidden",
                  opacity: isConnectionBoxHovering ? 1 : 0,
                  y: isConnectionBoxHovering ? 0 : 10,
                  transition: { duration: 0.3 },
                }}
                className="absolute hidden  items-center justify-center w-[40px] h-[40px] rounded-full bottom-[10px] right-[10px] bg-[#C7D2FE] z-40"
              >
                <ArrowUpRight className="text-[#4F46E5]" />
              </motion.div>
              {/* arrow  */}
              {/* bluish overlay with gradient */}
              <motion.div
                animate={{
                  display: isConnectionBoxHovering ? "flex" : "hidden",
                  opacity: isConnectionBoxHovering ? 1 : 0,
                  transition: { duration: 0.3 },
                }}
                className="absolute w-full h-[100px] bottom-0 left-0 bg-gradient-to-br from-transparent via-[#EEF2FF]/3 to-[#C7D2FE] z-30"
              />
              {/* bluish overlay with gradient */}
            </motion.div>
          ) : (
            <Link href={"/techbox"}>
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
                <div className="absolute w-[200px] h-full bottom-[26px] right-0 bg-gradient-to-r from-transparent z-10  via-white/8 to-white" />
                {/* side blurs */}
                <div className="flex items-center  justify-center flex-shrink-0 relative  ">
                  {/* profile Image */}
                  <motion.div
                    animate={{
                      borderColor: isConnectionBoxHovering ? "#4F46E5" : "",
                      transition: { duration: 0.3 },
                    }}
                    className={` -translate-x-[50%]  left-[50%] absolute z-10 w-[120px] h-[120px] border-[1px]  rounded-full ${borderColor.primary} flex items-center justify-center`}
                  >
                    <div
                      className={`w-[100px]  h-[100px] border-[1px]  rounded-full ${borderColor.primary} relative overflow-hidden shadow-inner`}
                    >
                      {(isLoadingConnectionsImage ||
                        connectionsImageDisplayLoading) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 z-10">
                          <Loader2
                            className="animate-spin text-gray-400"
                            size={24}
                          />
                        </div>
                      )}
                      {(connectionsImagePreview || connectionsImage) && (
                        <Image
                          src={
                            connectionsImagePreview ||
                            connectionsImage ||
                            "/placeholder.svg?height=100&width=100"
                          }
                          alt="profileImage"
                          layout="fill"
                          objectFit="cover"
                          onLoad={() =>
                            setConnectionsImageDisplayLoading(false)
                          }
                          onError={() =>
                            setConnectionsImageDisplayLoading(false)
                          }
                        />
                      )}
                    </div>
                    {/* Admin Controls for Connections Image */}
                  </motion.div>
                  {/* profile image */}
                  <div
                    className={`w-[190px] h-[190px] border-[1px]  rounded-full ${borderColor.primary} flex items-center justify-center relative `}
                  >
                    {/* small connections div */}
                    <motion.div
                      animate={{
                        y: isMobile ? 0 : isConnectionBoxHovering ? 0 : -100,
                        opacity: isMobile ? 1 : isConnectionBoxHovering ? 1 : 0,
                        transition: { duration: 0.1 },
                      }}
                      className={`w-[35px] h-[35px]  rounded-full absolute -translate-x-[50%]  left-[50%]  top-[-10px] flex justify-center items-center ${borderColor.primary} border-[1px] `}
                    >
                      <div
                        className={`w-[30px] shadow-inner h-[30px] rounded-full border-[1px] ${borderColor.primary} relative overflow-hidden`}
                      >
                        {connectionImageLoadingStates.get("profile1") && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-full z-10">
                            <Loader2
                              className="animate-spin text-gray-400"
                              size={12}
                            />
                          </div>
                        )}
                        <Image
                          src="/suhani.jpg"
                          alt="profileImage"
                          layout="fill"
                          objectFit="cover"
                          onLoad={() => handleConnectionImageLoad("profile1")}
                          onError={() => handleConnectionImageError("profile1")}
                        />
                      </div>
                    </motion.div>
                    {/* small connections div */}
                    <div
                      className={`w-[170px] bg-[#E9EAF1] shadow-inner h-[170px] border-[1px]  rounded-full ${borderColor.primary}`}
                    ></div>
                  </div>
                  <div
                    className={`w-[190px] h-[190px] border-[1px]  rounded-full ${borderColor.primary} flex items-center justify-center relative `}
                  >
                    {/* small connections div */}
                    <motion.div
                      animate={{
                        y: isMobile ? 0 : isConnectionBoxHovering ? 0 : 100,
                        opacity: isMobile ? 1 : isConnectionBoxHovering ? 1 : 0,
                        transition: { duration: 0.5 },
                      }}
                      className={`w-[50px] h-[50px]  rounded-full absolute   left-0 bottom-[20px] flex justify-center items-center ${borderColor.primary} border-[1px] `}
                    >
                      <div
                        className={`w-[40px] shadow-inner h-[40px] rounded-full border-[1px] ${borderColor.primary} relative overflow-hidden`}
                      >
                        {connectionImageLoadingStates.get("profile2") && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-full z-10">
                            <Loader2
                              className="animate-spin text-gray-400"
                              size={16}
                            />
                          </div>
                        )}
                        <Image
                          src="/chhavi.jpg"
                          alt="profileImage"
                          layout="fill"
                          objectFit="cover"
                          onLoad={() => handleConnectionImageLoad("profile2")}
                          onError={() => handleConnectionImageError("profile2")}
                        />
                      </div>
                    </motion.div>
                    <motion.div
                      animate={{
                        y: isMobile ? 0 : isConnectionBoxHovering ? 0 : -100,
                        opacity: isMobile ? 1 : isConnectionBoxHovering ? 1 : 0,
                        transition: { duration: 0.2 },
                      }}
                      className={`w-[60px] h-[60px]  rounded-full absolute   right-[50px] top-[-10px] flex justify-center items-center ${borderColor.primary} border-[1px] `}
                    >
                      <div
                        className={`w-[50px] shadow-inner h-[50px] rounded-full border-[1px] ${borderColor.primary} relative overflow-hidden`}
                      >
                        {connectionImageLoadingStates.get("yash") && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-full z-10">
                            <Loader2
                              className="animate-spin text-gray-400"
                              size={20}
                            />
                          </div>
                        )}
                        <Image
                          src="/yash.jpg"
                          alt="profileImage"
                          layout="fill"
                          objectFit="cover"
                          onLoad={() => handleConnectionImageLoad("yash")}
                          onError={() => handleConnectionImageError("yash")}
                        />
                      </div>
                    </motion.div>
                    {/* small connections div */}
                    <div
                      className={`w-[170px] bg-[#E9EAF1] shadow-inner h-[170px] border-[1px]  rounded-full ${borderColor.primary}`}
                    ></div>
                  </div>{" "}
                  <div
                    className={`w-[190px] h-[190px] border-[1px]  rounded-full ${borderColor.primary} flex items-center justify-center relative`}
                  >
                    {/* small connections div */}
                    <motion.div
                      animate={{
                        y: isMobile ? 0 : isConnectionBoxHovering ? 0 : 100,
                        opacity: isMobile ? 1 : isConnectionBoxHovering ? 1 : 0,
                        transition: { duration: 0.5 },
                      }}
                      className={`w-[70px] h-[70px]  rounded-full absolute   right-0 bottom-[20px]  flex justify-center items-center ${borderColor.primary} border-[1px]  `}
                    >
                      <div
                        className={`w-[60px] shadow-inner h-[60px] rounded-full border-[1px] ${borderColor.primary} relative overflow-hidden`}
                      >
                        {connectionImageLoadingStates.get("uday") && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-full z-10">
                            <Loader2
                              className="animate-spin text-gray-400"
                              size={24}
                            />
                          </div>
                        )}
                        <Image
                          src="/uday.jpeg"
                          alt="profileImage"
                          layout="fill"
                          objectFit="cover"
                          onLoad={() => handleConnectionImageLoad("uday")}
                          onError={() => handleConnectionImageError("uday")}
                        />
                      </div>
                    </motion.div>
                    {/* small connections div */}
                    <div
                      className={`w-[170px] h-[170px] border-[1px] bg-[#E9EAF1] shadow-inner rounded-full ${borderColor.primary}`}
                    ></div>
                  </div>
                  <div
                    className={`w-[190px] h-[190px] border-[1px]  rounded-full ${borderColor.primary} flex items-center justify-center relative`}
                  >
                    {/* small connections div */}
                    <motion.div
                      animate={{
                        y: isMobile ? 0 : isConnectionBoxHovering ? 0 : -100,
                        opacity: isMobile ? 1 : isConnectionBoxHovering ? 1 : 0,
                        transition: { duration: 0.3 },
                      }}
                      className={`w-[40px] h-[40px]  rounded-full absolute   left-0 top-[20px] flex justify-center items-center ${borderColor.primary} border-[1px]  `}
                    >
                      <div
                        className={`w-[35px] shadow-inner h-[35px] rounded-full border-[1px] ${borderColor.primary} relative overflow-hidden`}
                      >
                        {connectionImageLoadingStates.get("profile3") && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-full z-10">
                            <Loader2
                              className="animate-spin text-gray-400"
                              size={14}
                            />
                          </div>
                        )}
                        <Image
                          src="/ankit.jpg"
                          alt="profileImage"
                          layout="fill"
                          objectFit="cover"
                          onLoad={() => handleConnectionImageLoad("profile3")}
                          onError={() => handleConnectionImageError("profile3")}
                        />
                      </div>
                    </motion.div>
                    {/* small connections div */}
                    <div
                      className={`w-[170px] h-[170px] border-[1px] bg-[#E9EAF1] shadow-inner  rounded-full ${borderColor.primary}`}
                    ></div>
                  </div>{" "}
                </div>
                <div className="w-full flex flex-col  items-center">
                  <p className={`text-[#000000] mb-[8px] font-semibold`}>
                    Connections
                  </p>
                  <p
                    className={`${fontColor.secondry}  max-sm:px-16 max-sm:text-center `}
                  >
                    Check out my favorite tech and spots around the globe.
                  </p>
                </div>
                {/* arrow  */}
                <motion.div
                  animate={{
                    display: isConnectionBoxHovering ? "flex" : "hidden",
                    opacity: isConnectionBoxHovering ? 1 : 0,
                    y: isConnectionBoxHovering ? 0 : 10,
                    transition: { duration: 0.3 },
                  }}
                  className="absolute hidden  items-center justify-center w-[40px] h-[40px] rounded-full bottom-[10px] right-[10px] bg-[#C7D2FE] z-40"
                >
                  <ArrowUpRight className="text-[#4F46E5]" />
                </motion.div>
                {/* arrow  */}
                {/* bluish overlay with gradient */}
                <motion.div
                  animate={{
                    display: isConnectionBoxHovering ? "flex" : "hidden",
                    opacity: isConnectionBoxHovering ? 1 : 0,
                    transition: { duration: 0.3 },
                  }}
                  className="absolute w-full h-[100px] bottom-0 left-0 bg-gradient-to-br from-transparent via-[#EEF2FF]/3 to-[#C7D2FE] z-30"
                />
                {/* bluish overlay with gradient */}
              </motion.div>
            </Link>
          )}

          {/* div2 -child div(ii) */}
          <Link href={"/book-a-call"} className={`w-full h-[220px]`}>
            <motion.div
              onHoverStart={() =>
                dispatch(homeAboutActions.setIsCallBoxHovering(true))
              }
              onHoverEnd={() =>
                dispatch(homeAboutActions.setIsCallBoxHovering(false))
              }
              className={`w-full h-[220px] rounded-2xl  border-[1px] ${borderColor.primary} bg-[#ffffff] shadow-gray-300  flex justify-between pl-[24px]  cursor-pointer relative overflow-hidden`}
            >
              <div className="flex flex-col text-[16px] py-5 w-[180px] max-small-l:text-[14px]">
                <p className={`text-[#000000] mb-[16px] font-semibold`}>
                  Book a call with me
                </p>
                <div className={`${fontColor.secondry}`}>
                  <p>
                    I&apos;d love to chat even
                    <br />
                    if there is no agenda!
                  </p>
                </div>
              </div>
              <div className="flex-1 flex items-end justify-end text-center relative flex-shrink-0  ">
                <motion.div
                  animate={{
                    borderColor: isCallBoxHovering ? "#4F46E5" : "",
                    scale: isCallBoxHovering ? 1.1 : 1,
                    transition: { duration: 0.3 },
                  }}
                  className={`w-[490px] h-[190px] border-t-[1px]              border-l-[1px] rounded-tl-[20px] flex items-end justify-end ${borderColor.primary} flex-shrink-0 max-small-l:w-[400px] max-small-l:h-[160px] max-md:w-full max-sm:w-[300px] max-sm:absolute max-sm:right-[-70px] max-m:w-[250px] max-m:right-[-120px]`}
                >
                  <div
                    className={`w-[480px] h-[180px] border-t-[1px]              border-l-[1px] rounded-tl-[10px] ${borderColor.primary} shadow-inner overflow-hidden bg-[#E9EAF1] flex flex-col flex-shrink-0  max-small-l:w-[390px] max-small-l:h-[150px] max-md:w-[98%]`}
                  >
                    <div className="w-full h-[40px] px-[10px] flex items-center justify-start gap-2.5 flex-shrink-0">
                      <p
                        className={`${fontColor.secondry} font-semibold text-[14px]`}
                      >
                        {new Date().toLocaleString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                      <span className="h-1 w-1 rounded-full bg-[#a5aeb8]"></span>
                      <p className="text-[#a5aeb8] text-[12px]">
                        30 minute call
                      </p>
                    </div>

                    <div className="flex-1  pl-[20px]  grid grid-cols-7 grid-rows-5 gap-2 px-4">
                      {calenderElements.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className={`col-span-1 row-span-1 flex h-8 w-8 items-center justify-center                               text-[#a5aeb8] text-[12px] font-semibold                            `}
                          >
                            <p>{item}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </div>
              {/* arrow  */}
              <motion.div
                animate={{
                  display: isCallBoxHovering ? "flex" : "hidden",
                  opacity: isCallBoxHovering ? 1 : 0,
                  y: isCallBoxHovering ? 0 : 10,
                  transition: { duration: 0.3 },
                }}
                className="absolute hidden  items-center justify-center w-[40px] h-[40px] rounded-full bottom-[10px] right-[10px] bg-[#C7D2FE] z-40"
              >
                <ArrowUpRight className="text-[#4F46E5]" />
              </motion.div>
              {/* arrow  */}
              {/* bluish overlay with gradient */}
              <motion.div
                animate={{
                  display: isCallBoxHovering ? "flex" : "hidden",
                  opacity: isCallBoxHovering ? 1 : 0,
                  transition: { duration: 0.3 },
                }}
                className="absolute w-full h-[100px] bottom-0 left-0 bg-gradient-to-br from-transparent via-[#EEF2FF]/3 to-[#C7D2FE] z-30"
              />
              {/* bluish overlay with gradient */}
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
