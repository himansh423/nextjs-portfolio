import HeroSection from "@/components/HomePage/HeroSection";
import sideLines from "../../public/sideLines.jpg";
import AboutSection from "@/components/HomePage/AboutSection";

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
      <div className="flex-1 flex flex-col">
        <HeroSection />
        <AboutSection />
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
