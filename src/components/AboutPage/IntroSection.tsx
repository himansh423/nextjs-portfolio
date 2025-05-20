import { borderColor, fontColor } from "@/library/constants/colors";
import { racingSans } from "@/library/constants/fonts";
import Image from "next/image";

const IntroSection = () => {
  return (
    <div className={`w-full min-h-screen`}>
      <div
        className={`w-full border-b-[1px] text-center text-[#4f46ef] text-[14px] font-semibold ${borderColor.primary} shadow-xs`}
      >
        <p>About</p>
      </div>
      <div
        className={`border-y-[1px] ${borderColor.primary} text-[30px] text-center ${racingSans.className} mt-8`}
      >
        <p>
          Here&apos;s a quick intro about <br /> me and what I love to do
        </p>
      </div>
      {/* intro section */}
      <div className="w-full min-h-screen mt-20 flex flex-col">
        {/* first row */}
        <div className="w-full flex items-center max-md:flex-col max-md:gap-24">
          <div className="w-1/2 h-[400px] relative max-md:w-full max-md:h-[300px]">
            <div
              className={`absolute w-[210px] h-[290px] rounded-xl bg-[#f5f5f5] translate-x-[-50%] left-[50%] translate-y-[-50%] top-[50%] flex items-center justify-center ${borderColor.primary} border-[1px] max-md:top-[50%]`}
            >
              <div
                className={`w-[190px] h-[270px] bg-[#EDEEF0] rounded-lg shadow-inner ${borderColor.primary} border-[1px]`}
              ></div>
            </div>

            <div
              className={`absolute w-[200px] h-[290px] rounded-xl -rotate-12 translate-x-[-50%] left-[50%] translate-y-[-50%] top-[50%] flex items-center justify-center ${borderColor.primary} border-[1px] overflow-hidden max-md:top-[50%]`}
            >
              <div className="w-full h-full relative">
                <Image
                  src={"/cardimg2.jpg"}
                  alt="img"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>
          <div className="w-1/2 h-full flex flex-col items-start justify-center gap-7 px-16 max-md:w-full max-md:px-5 max-md:pb-10">
            <p className={`text-[30px] font-semibold ${fontColor.primary}`}>
              Finding My Way to Web
            </p>
            <p className={`text-[16px] leading-[35px] text-[#5e5f6e]`}>
              Despite my love for mobile development, the web kept calling my
              name. With my eye for design, frontend felt like the perfect
              playground. I dove into HTML, CSS, and JavaScript—with React in
              2016 becoming my game-changer. A few months later and I had landed
              my first full-time web dev role and never looked back.
            </p>
          </div>
        </div>
        {/* first row */}

        {/* second row */}
        <div className="w-full flex items-center max-md:flex-col-reverse max-md:gap-24 mt-20">
          <div className="w-1/2 h-full flex flex-col items-start justify-center gap-7 px-16 max-md:w-full max-md:px-5 max-md:pb-10">
            <p className={`text-[30px] font-semibold ${fontColor.primary}`}>
              Finding My Way to Web
            </p>
            <p className={`text-[16px] leading-[35px] text-[#5e5f6e]`}>
              Despite my love for mobile development, the web kept calling my
              name. With my eye for design, frontend felt like the perfect
              playground. I dove into HTML, CSS, and JavaScript—with React in
              2016 becoming my game-changer. A few months later and I had landed
              my first full-time web dev role and never looked back.
            </p>
          </div>
          <div className="w-1/2 h-[400px] relative max-md:w-full max-md:h-[300px]">
            <div
              className={`absolute w-[210px] h-[290px] rounded-xl bg-[#f5f5f5] translate-x-[-50%] left-[50%] translate-y-[-50%] top-[50%] flex items-center justify-center ${borderColor.primary} border-[1px] max-md:top-[50%]`}
            >
              <div
                className={`w-[190px] h-[270px] bg-[#EDEEF0] rounded-lg shadow-inner ${borderColor.primary} border-[1px]`}
              ></div>
            </div>

            <div
              className={`absolute w-[200px] h-[290px] rounded-xl rotate-12 translate-x-[-50%] left-[50%] translate-y-[-50%] top-[50%] flex items-center justify-center ${borderColor.primary} border-[1px] overflow-hidden max-md:top-[50%]`}
            >
              <div className="w-full h-full relative">
                <Image
                  src={"/cardimg2.jpg"}
                  alt="img"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>
        </div>
        {/* second row */}

        {/* Third row */}
        <div className="w-full flex items-center max-md:flex-col max-md:gap-24 mt-20">
          <div className="w-1/2 h-[400px] relative max-md:w-full max-md:h-[300px]">
            <div
              className={`absolute w-[210px] h-[290px] rounded-xl bg-[#f5f5f5] translate-x-[-50%] left-[50%] translate-y-[-50%] top-[50%] flex items-center justify-center ${borderColor.primary} border-[1px] max-md:top-[50%]`}
            >
              <div
                className={`w-[190px] h-[270px] bg-[#EDEEF0] rounded-lg shadow-inner ${borderColor.primary} border-[1px]`}
              ></div>
            </div>

            <div
              className={`absolute w-[200px] h-[290px] rounded-xl -rotate-12 translate-x-[-50%] left-[50%] translate-y-[-50%] top-[50%] flex items-center justify-center ${borderColor.primary} border-[1px] overflow-hidden max-md:top-[50%]`}
            >
              <div className="w-full h-full relative">
                <Image
                  src={"/cardimg2.jpg"}
                  alt="img"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>
          <div className="w-1/2 h-full flex flex-col items-start justify-center gap-7 px-16 max-md:w-full max-md:px-5 max-md:pb-10">
            <p className={`text-[30px] font-semibold ${fontColor.primary}`}>
              Finding My Way to Web
            </p>
            <p className={`text-[16px] leading-[35px] text-[#5e5f6e]`}>
              Despite my love for mobile development, the web kept calling my
              name. With my eye for design, frontend felt like the perfect
              playground. I dove into HTML, CSS, and JavaScript—with React in
              2016 becoming my game-changer. A few months later and I had landed
              my first full-time web dev role and never looked back.
            </p>
          </div>
        </div>
        {/* Third Row */}

        {/* Fourth Row */}
        <div className="w-full flex items-center max-md:flex-col-reverse max-md:gap-24 mt-20 mb-20">
          <div className="w-1/2 h-full flex flex-col items-start justify-center gap-7 px-16 max-md:w-full max-md:px-5 max-md:pb-10">
            <p className={`text-[30px] font-semibold ${fontColor.primary}`}>
              Finding My Way to Web
            </p>
            <p className={`text-[16px] leading-[35px] text-[#5e5f6e]`}>
              Despite my love for mobile development, the web kept calling my
              name. With my eye for design, frontend felt like the perfect
              playground. I dove into HTML, CSS, and JavaScript—with React in
              2016 becoming my game-changer. A few months later and I had landed
              my first full-time web dev role and never looked back.
            </p>
          </div>
          <div className="w-1/2 h-[400px] relative max-md:w-full max-md:h-[300px]">
            <div
              className={`absolute w-[210px] h-[290px] rounded-xl bg-[#f5f5f5] translate-x-[-50%] left-[50%] translate-y-[-50%] top-[50%] flex items-center justify-center ${borderColor.primary} border-[1px] max-md:top-[50%]`}
            >
              <div
                className={`w-[190px] h-[270px] bg-[#EDEEF0] rounded-lg shadow-inner ${borderColor.primary} border-[1px]`}
              ></div>
            </div>

            <div
              className={`absolute w-[200px] h-[290px] rounded-xl rotate-12 translate-x-[-50%] left-[50%] translate-y-[-50%] top-[50%] flex items-center justify-center ${borderColor.primary} border-[1px] overflow-hidden max-md:top-[50%]`}
            >
              <div className="w-full h-full relative">
                <Image
                  src={"/cardimg2.jpg"}
                  alt="img"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Fourth Row */}
      </div>
      {/* intro section */}
    </div>
  );
};

export default IntroSection;