import HeroSection from "@/components/AboutPage/HeroSection";
import sideLines from "../../../public/sideLines.jpg";

const page = () => {
  return (
    <div className="w-full min-h-screen flex justify-between">
      <div
        className="w-[30px] min-h-screen bg-repeat-y bg-top"
        style={{
          backgroundImage: `url(${sideLines.src})`,
          backgroundSize: "contain",
        }}
      ></div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeroSection />
      </div>

      <div
        className="w-[30px] min-h-screen bg-repeat-y bg-top"
        style={{
          backgroundImage: `url(${sideLines.src})`,
          backgroundSize: "contain",
        }}
      ></div>
    </div>
  );
};

export default page;
