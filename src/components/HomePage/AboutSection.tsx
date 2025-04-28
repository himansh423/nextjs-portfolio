import { borderColor, fontColor } from "@/library/constants/colors";
import { racingSans } from "@/library/constants/fonts";
import Image from "next/image";

const AboutSection = () => {
  return (
    <div>
      <div
        className={`w-full border-b-[1px]  text-center text-[#4f46ef] text-[14px] font-semibold ${borderColor.primary}`}
      >
        <p>About</p>
      </div>
      <div
        className={`w-full border-y-[1px]  text-center ${fontColor.primary} text-[36px] font-semibold ${borderColor.primary} mt-7 px-[340px] ${racingSans.className} leading-[40px]`}
      >
        <p>Here's what sets me apart and makes me unique</p>
      </div>

      {/* about grid */}
      {/* parent div */}
      <div
        className={`w-full flex justify-between gap-2 items-center mt-20 border-y-[1px] ${borderColor.primary} `}
      >
        {/* child div1 */}
        <div className="w-[40%] flex flex-col gap-2">
          {/* div1 - child div(i) */}
          <div
            className={`w-full h-[220px] rounded-2xl border-[1px] ${borderColor.primary} bg-[#ffffff] shadow-gray-300 flex justify-between p-[24px]  relative overflow-hidden`}
          >
            <div className=" flex flex-col text-[16px] w-[230px]">
              <p className={`text-[#000000] mb-[16px] font-semibold`}>
                Learn more about me
              </p>
              <div className={`${fontColor.secondry}`}>
                <p>Good afternoon!</p>
                <p>I'm Himanshu, a Experienced Full Stack Developer.</p>
              </div>
            </div>
            <div className="flex-1  flex justify-center text-center relative">
              {/* backDiv */}
              <div
                className={`w-[185px] rounded-xl h-[290px] border-[1px] flex items-center justify-center ${borderColor.primary}`}
              >
                <div
                  className={`w-[165px] border-[1px] rounded-lg h-[270px] bg-[#E9EAF1]  ${borderColor.primary}`}
                ></div>
              </div>
              {/* imgDiv - overlay */}
              <div
                className={`w-[185px] rounded-xl h-[290px] border-[1px] flex items-center justify-center ${borderColor.primary} absolute  translate-x-[-50%]  left-[50%] top-0 rotate-12 overflow-hidden`}
              >
                {" "}
                <div className="w-full h-full relative overflow-hidden">
                  <Image
                    src={"/Profile.jpg"}
                    alt="profileImage"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* div1 - child div(ii) */}
          <div
            className={`w-full h-[300px] rounded-2xl  border-[1px] ${borderColor.primary} bg-[#ffffff] shadow-gray-300 py-[24px] flex flex-col justify-between overflow-hidden relative`}
          >
            <div className={` flex flex-col items-center text-[16px]`}>
              <p className={`text-[#000000] mb-[8px] font-semibold`}>Techbox</p>
              <p className={`${fontColor.secondry}`}>
                Check out my favorite tech and spots around the globe.
              </p>
            </div>
            <div className="flex w-full items-center justify-center gap-3  overflow-hidden">
              <div
                className={`w-[120px] h-[120px] flex-shrink-0 rounded-[20px] border-[1px] ${borderColor.primary} flex justify-center items-center`}
              >
                <div
                  className={`w-[100px] h-[100px] flex-shrink-0 rounded-[10px] border-[1px] ${borderColor.primary} bg-[#E9EAF1] shadow-inner flex items-center justify-center`}
                >
                  <div className="w-[40px] h-[40px] bg-white rounded-full relative">
                    <Image
                      src="/next.png"
                      alt="next"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
              </div>{" "}
              <div
                className={`w-[120px] h-[120px] flex-shrink-0 rounded-[20px] border-[1px] ${borderColor.primary} flex justify-center items-center`}
              >
                <div
                  className={`w-[100px] h-[100px] flex-shrink-0 rounded-[10px] border-[1px] ${borderColor.primary} bg-[#E9EAF1] shadow-inner flex items-center justify-center`}
                >
                  <div className="w-[40px] h-[40px] bg-white rounded-full relative">
                    <Image
                      src="/next.png"
                      alt="next"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
              </div>
              {/* center div */}
              <div
                className={`w-[130px] h-[130px] flex-shrink-0 rounded-[20px] border-[1px] ${borderColor.primary} flex justify-center items-center`}
              >
                <div
                  className={`w-[110px] h-[110px] flex-shrink-0 rounded-[10px] border-[1px] ${borderColor.primary} bg-[#E9EAF1] shadow-inner flex items-center justify-center`}
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
              </div>
              {/* center div */}
              <div
                className={`w-[120px] h-[120px] flex-shrink-0 rounded-[20px] border-[1px] ${borderColor.primary} flex justify-center items-center`}
              >
                <div
                  className={`w-[100px] h-[100px] flex-shrink-0 rounded-[10px] border-[1px] ${borderColor.primary} bg-[#E9EAF1] shadow-inner flex items-center justify-center`}
                >
                  <div className="w-[40px] h-[40px] bg-white rounded-full relative">
                    <Image
                      src="/next.png"
                      alt="next"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
              </div>
              <div
                className={`w-[120px] h-[120px] flex-shrink-0 rounded-[20px] border-[1px] ${borderColor.primary} flex justify-center items-center`}
              >
                <div
                  className={`w-[100px] h-[100px] flex-shrink-0 rounded-[10px] border-[1px] ${borderColor.primary} bg-[#E9EAF1] shadow-inner flex items-center justify-center`}
                >
                  <div className="w-[40px] h-[40px] bg-white rounded-full relative">
                    <Image
                      src="/next.png"
                      alt="next"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
              </div>{" "}
            </div>

            <div className="absolute w-[80px] h-full bottom-[26px] left-0 bg-gradient-to-r from-white via-white/20 to-transparent" />
            <div className="absolute w-[80px] h-full bottom-[26px] right-0 bg-gradient-to-r from-transparent  via-white/20 to-white" />
          </div>
        </div>
        {/* child div2 */}
        <div className="w-[60%] flex flex-col gap-2">
          <div
            className={`w-full h-[300px] rounded-2xl  border-[1px] ${borderColor.primary} bg-[#ffffff] shadow-gray-300`}
          ></div>
          <div
            className={`w-full h-[220px] rounded-2xl  border-[1px] ${borderColor.primary} bg-[#ffffff] shadow-gray-300`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
