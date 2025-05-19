import { fontColor } from "@/library/constants/colors";
import silver from "../../public/silversurfer.png";
import Image from "next/image";

const SubscribeBox = () => {
  return (
    <div className="w-full  py-[70px] max-sm:px-2">
      <div className="w-full h-[500px] overflow-hidden bg-[#3C3C3F] rounded-2xl flex flex-col justify-between max-md:h-[600px]">
        {/*  */}
        <div className="w-full flex">
          <div className="w-[50px] h-[50px]   "></div>
          <div
            className={`flex-1 h-[50px]  border-x-[1px] border-[#d4d4d8]`}
          ></div>
          <div className="w-[50px] h-[50px]   "></div>{" "}
        </div>
        {/*  */}

        {/*  */}
        <div className="w-full flex flex-1">
          <div
            className={`w-[50px] h-full  border-y-[1px] border-[#d4d4d8]`}
          ></div>
          <div
            className={`mainContent flex-1 h-full  border-[1px] border-[#d4d4d8] flex max-sm:w-[100px]`}
          >
            <div className="w-1/2 h-full px-12 py-11 max-sm:py-10 max-sm:w-full max-sm:px-2">
              <p className="text-[#faf8fc] text-[30px] font-semibold max-sm:text-[25px]">
                Subscribe to <br /> my newsletter
              </p>
              <p className={`text-[#d1d5db] mt-5 text-[16px]`}>
                A periodic update about my life, recent blog <br /> posts,
                how-tos, and discoveries.
              </p>
              <div className="w-[425px] h-[50px] mt-12 relative max-sm:w-full">
                <input
                  type="text"
                  placeholder="himanshuchau423@gmail.com"
                  className="w-full h-full focus:outline-none border-[1px] border-[#d4d4d6]  px-[12px] placeholder:text-[#d4d4d6] rounded-[80px] text-[#faf8fc] focus:border-[2px] focus:border-[#faf8fc]"
                />
                <button className="absolute w-[100px] bg-[#ffffff] h-[45] top-[50%] translate-y-[-50%] right-1 rounded-[80px] font-semibold text-[14px] z-10">
                  <p className={` ${fontColor.primary}`}>Subscribe</p>
                </button>
              </div>

              <p className={`text-[16px] text-[#d1d5db] mt-10 text-nowrap max-sm:text-wrap`}>
                <span className="text-[#ffffff] font-bold">NO SPAM.</span> I
                never send spam. You can unsubscribe at any time!
              </p>
            </div>
            <div className="w-1/2 h-full relative max-md:hidden">
              <Image
                src={silver.src}
                alt="silver"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div
            className={`w-[50px] h-full  border-y-[1px] border-[#d4d4d8]`}
          ></div>
        </div>
        {/*  */}

        {/*  */}
        <div className="w-full flex">
          <div className="w-[50px] h-[50px]  "></div>
          <div
            className={`flex-1 h-[50px]  border-x-[1px] border-[#d4d4d8]`}
          ></div>
          <div className="w-[50px] h-[50px]  "></div>{" "}
        </div>

        {/*  */}
      </div>
    </div>
  );
};

export default SubscribeBox;
