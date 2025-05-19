import { borderColor } from "@/library/constants/colors";
import { racingSans } from "@/library/constants/fonts";

const HeroSection = () => {
  return (
    <div className="w-full  flex flex-col">
      <div
        className={`w-full h-[280px] border-[1px] ${borderColor.primary} flex items-center`}
      >
        <div
          className={`w-full flex items-center justify-center border-y-[1px] ${borderColor.primary}`}
        >
          <p
            className={`${racingSans.className} text-center leading-[65px] text-[60px]`}
          >An evolving list of<br />people I&apos;ve met and<br />those I wish to meet.</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
