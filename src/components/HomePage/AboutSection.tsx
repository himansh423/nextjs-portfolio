import { borderColor, fontColor } from "@/library/constants/colors";
import { racingSans } from "@/library/constants/fonts";

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

      <div
        className={`w-full flex justify-between gap-2 items-center mt-20 border-y-[1px] ${borderColor.primary} `}
      >
        <div className="w-[40%] flex flex-col gap-2">
          <div
            className={`w-full h-[220px] rounded-2xl border-[1px] ${borderColor.primary} bg-[#ffffff] shadow-gray-300`}
          ></div>
          <div
            className={`w-full h-[300px] rounded-2xl  border-[1px] ${borderColor.primary} bg-[#ffffff] shadow-gray-300`}
          ></div>
        </div>
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
