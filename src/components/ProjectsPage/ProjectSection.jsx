import { borderColor, fontColor } from "@/library/constants/colors";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";

const ProjectSection = () => {
  return (
    <div className="w-full flex flex-col">
      <div className={`w-full flex mt-[50px] flex-col gap-10 py-10`}>
        <div className={`w-full px-14 ${borderColor.primary} border-y-[1px]`}>
          <div
            className={`border-[1px] ${borderColor.primary} w-full h-[80vh] rounded-2xl overflow-hidden shadow-black/10 shadow-xl relative`}
          >
            <Image
              src={"/HealthCarePlus.png"}
              alt="HealthCare+ project screenshot"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div
          className={`w-full flex py-[20px] flex-col gap-6 items-start border-y-[1px] ${borderColor.primary} px-18`}
        >
          <p className={`text-[24px] ${fontColor.primary} font-semibold`}>
            HealthCare+ - AI Powered Healthcare Platform
          </p>
          <p className={`text-[16px] ${fontColor.secondry}`}>
            The Health Prototype platform offers AI-driven, low-cost healthcare
            for underserved communities through tailored subscriptions, bundled
            diagnostics and medicine, teleconsultations, and QR-based health
            tracking. It integrates public schemes and emphasizes real health
            outcomes like reduced hospital visits.
          </p>
          <div className="flex flex-wrap gap-6 mt-2">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${borderColor.primary} border-[1px] transition-all hover:bg-gray-100 dark:hover:bg-gray-800`}
            >
              <Github size={20} />
              <span className="font-medium">View Source Code</span>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white transition-all hover:bg-blue-600`}
            >
              <ExternalLink size={20} />
              <span className="font-medium">Live Demo</span>
            </a>
          </div>
        </div>
      </div>



      <div className={`w-full flex mt-[50px] flex-col gap-10 py-10`}>
        <div className={`w-full px-14 ${borderColor.primary} border-y-[1px]`}>
          <div
            className={`border-[1px] ${borderColor.primary} w-full h-[80vh] rounded-2xl overflow-hidden shadow-black/10 shadow-xl relative`}
          >
            <Image
              src={"/HealthCarePlus.png"}
              alt="HealthCare+ project screenshot"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div
          className={`w-full flex py-[20px] flex-col gap-6 items-start border-y-[1px] ${borderColor.primary} px-18`}
        >
          <p className={`text-[24px] ${fontColor.primary} font-semibold`}>
            HealthCare+ - AI Powered Healthcare Platform
          </p>
          <p className={`text-[16px] ${fontColor.secondry}`}>
            The Health Prototype platform offers AI-driven, low-cost healthcare
            for underserved communities through tailored subscriptions, bundled
            diagnostics and medicine, teleconsultations, and QR-based health
            tracking. It integrates public schemes and emphasizes real health
            outcomes like reduced hospital visits.
          </p>
          <div className="flex flex-wrap gap-6 mt-2">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${borderColor.primary} border-[1px] transition-all hover:bg-gray-100 dark:hover:bg-gray-800`}
            >
              <Github size={20} />
              <span className="font-medium">View Source Code</span>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white transition-all hover:bg-blue-600`}
            >
              <ExternalLink size={20} />
              <span className="font-medium">Live Demo</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;
