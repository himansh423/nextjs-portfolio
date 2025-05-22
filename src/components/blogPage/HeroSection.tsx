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
            className={`${racingSans.className} text-center leading-[65px] text-[60px] max-sm:text-[40px] max-sm:leading-[40px]`}
          >
Insightful && helpful<br />content curated for you.          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
