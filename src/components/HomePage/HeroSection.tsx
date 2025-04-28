import { borderColor, fontColor } from "@/library/constants/colors";
import Image from "next/image";
import profileImg from "../../../public/Profile.jpg";
import PhotoGallery from "./PhotoCards";
import { racingSans } from "@/library/constants/fonts";



const HeroSection = () => {
  return (
    <div className="w-full flex flex-col">
      {/* profile Box */}
      <div
        className={`w-full h-[250px] flex justify-center items-center border-b-[1px] ${borderColor.primary}`}
      >
        <div
          className={`w-[140px] h-[140px] rounded-full border-[1px] ${borderColor.primary} flex justify-center items-center mt-10`}
        >
          <div
            className={`w-[110px] h-[110px] rounded-full border-[1px] ${borderColor.primary} flex justify-center items-center`}
          >
            <div
              className={`w-[100px] h-[100px] rounded-full border-[1px] ${borderColor.primary} overflow-hidden relative `}
            >
              <Image
                src={profileImg.src}
                alt="profileImage"
                objectFit="cover"
                fill
              />
            </div>
          </div>
        </div>
      </div>
      {/* Hey Box */}
      <div
        className={`w-full py-2 flex justify-center px-[250px] text-center border-b-[1px] ${borderColor.primary}`}
      >
        <p
          className={`${fontColor.primary} ${racingSans.className} font-semibold text-6xl`}
        >
          Hey, I'm Himanshu! Welcome to my corner of the internet!
        </p>
      </div>

      {/* description box */}
      <div
        className={`w-full flex items-center ${fontColor.secondry} text-center px-[250px] py-2 border-y-[1px] mt-7 ${borderColor.primary}`}
      >
        <p>
          I'm a Full Stack Developer with a love for design and a knack for
          tinkering. This site is intentionally over-engineered and serves as my
          playground for experimenting with new ideas and seeing what sticks!
        </p>
      </div>

      {/* Images Box */}

      <div>
        <PhotoGallery />
      </div>
    </div>
  );
};

export default HeroSection;
