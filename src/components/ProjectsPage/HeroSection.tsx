import { borderColor } from "@/library/constants/colors";
import { racingSans } from "@/library/constants/fonts";

const HeroSection = () => {
  return (
    <div className="w-full  flex flex-col">
      <div
        className={`w-full h-[280px] border-b-[1px] ${borderColor.primary} flex items-center`}
      >
        <div
          className={`w-full flex items-center justify-center border-y-[1px] ${borderColor.primary}`}
        >
          <p
            className={`${racingSans.className} text-center leading-[65px] max-md:leading-[50px] text-[60px] max-md:text-[40px]`}
          >
            A collection of my <br /> favorite works.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
