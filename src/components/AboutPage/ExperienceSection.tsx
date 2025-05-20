"use client";
import { borderColor, fontColor } from "@/library/constants/colors";
import { racingSans } from "@/library/constants/fonts";
import { motion } from "framer-motion";
const ExperienceSection = () => {
  return (
    <div className="w-full  mt-20">
      <div
        className={`w-full border-y-[1px]  text-center text-[#4f46ef] text-[14px] font-semibold ${borderColor.primary} shadow-xs`}
      >
        <p>Experience</p>
      </div>

      <div
        className={`w-full border-y-[1px]  text-center ${fontColor.primary} text-[36px] font-semibold ${borderColor.primary} mt-7 px-[340px] ${racingSans.className} leading-[40px] shadow-xs max-small-l:px-10`}
      >
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.5,
            ease: "easeOut",
          }}
        >
          My work history and <br /> achievements timeline.{" "}
        </motion.p>
      </div>

      <div
        className={`w-full  mt-16 ${borderColor.primary} border-y-[1px] flex flex-col gap-20`}
      >
        {/* exp 1 */}

        <div className={`w-full ${borderColor.primary} flex max-md:gap-6 `}>
          <div className="w-1/2 h-full  px-10 max-md:px-1 max-md:w-[100px]">
            <p className={`text-[20px] ${fontColor.primary} font-semibold`}>
              Adprovize InfoTech
            </p>
            <p className={`text-[14px] ${fontColor.secondry}`}>
              2025 - Present
            </p>
          </div>
          <div className="w-1/2 h-full pr-14 max-md:pr-1 flex flex-col gap-4 max-md:flex-1">
            <p className={`text-[20px] ${fontColor.primary} font-semibold`}>
              Senior Full Stack Developer
            </p>
            <p className={`text-[16px] ${fontColor.secondry}`}>
              I designed and developed full-stack RESTful microservices using
              Netflix OSS, Java, Spring Boot, SQL, Angular, React, and Vue.
            </p>
            <p className={`text-[16px] ${fontColor.secondry}`}>
              I led development teams, utilizing extreme programming principles
              such as agile, test-driven development, and paired programming.{" "}
            </p>
            <p className={`text-[16px] ${fontColor.secondry}`}>
              I spearheaded the information architecture and developed a
              reusable UI component library for healthcare clients.
            </p>
            <p className={`text-[16px] ${fontColor.secondry}`}>
              I led over 650 developers through a monthly enablement process,
              training them for client work on the Digital Engineering stack.
            </p>
          </div>
        </div>
        {/* exp 1 */}

        {/* exp 2 */}
        <div className={`w-full ${borderColor.primary} flex max-md:gap-6 `}>
          <div className="w-1/2 h-full  px-10 max-md:px-1 max-md:w-[100px]">
            <p className={`text-[20px] ${fontColor.primary} font-semibold`}>
              Cyroweb Solutions
            </p>
            <p className={`text-[14px] ${fontColor.secondry}`}>2024 - 2025</p>
          </div>
          <div className="w-1/2 h-full pr-14 max-md:pr-1 flex flex-col gap-4 max-md:flex-1">
            <p className={`text-[20px] ${fontColor.primary} font-semibold`}>
              Founder
            </p>
            <p className={`text-[16px] ${fontColor.secondry}`}>
              I designed and developed full-stack RESTful microservices using
              Netflix OSS, Java, Spring Boot, SQL, Angular, React, and Vue.
            </p>
            <p className={`text-[16px] ${fontColor.secondry}`}>
              I led development teams, utilizing extreme programming principles
              such as agile, test-driven development, and paired programming.{" "}
            </p>
            <p className={`text-[16px] ${fontColor.secondry}`}>
              I spearheaded the information architecture and developed a
              reusable UI component library for healthcare clients.
            </p>
            <p className={`text-[16px] ${fontColor.secondry}`}>
              I led over 650 developers through a monthly enablement process,
              training them for client work on the Digital Engineering stack.
            </p>
          </div>
        </div>

        {/* exp 2 */}
      </div>
    </div>
  );
};

export default ExperienceSection;
