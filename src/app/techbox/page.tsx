import HeroSection from "@/components/TechBoxPage/HeroSection";
import sideLines from "../../../public/sideLines.jpg";
import LanguagesLibraryAndFrameworks from "@/components/TechBoxPage/LanguagesLibraryAndFrameworks";

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
        <LanguagesLibraryAndFrameworks/>
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
