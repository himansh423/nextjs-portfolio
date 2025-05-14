import { Check, Cross, X } from "lucide-react";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
const gradientColors = [
  "bg-gradient-to-b from-pink-400 via-red-400 to-yellow-300",
  "bg-gradient-to-b from-blue-400 via-purple-500 to-pink-400",
  "bg-gradient-to-b from-green-400 via-yellow-300 to-red-400",
  "bg-gradient-to-b from-teal-400 via-blue-300 to-indigo-500",
  "bg-gradient-to-b from-yellow-400 via-red-300 to-pink-400",
  "bg-gradient-to-b from-purple-400 via-indigo-400 to-blue-400",
  "bg-gradient-to-b from-orange-400 via-pink-400 to-purple-400",
  "bg-gradient-to-b from-lime-400 via-green-300 to-emerald-500",
  "bg-gradient-to-b from-sky-400 via-blue-400 to-indigo-400",
];
const AddView = () => {
  return (
    <div className="hidden w-full h-screen bg-gray-700/80 absolute z-40 top-0 left-0 flex items-center justify-center flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="w-[65px] h-[65px] flex items-center-safe justify-center text-[24px] text-gray-500 bg-[#f7f7f8] rounded-full">
          <div>
            <FaLessThan />
          </div>
        </div>
        <div className="w-[380px] h-[455px] bg-[#f7f7f8] rounded-xl flex flex-col p-[10px]">
          <div className="w-full h-[386px] bg-gradient-to-b from-pink-400 via-red-400 to-yellow-300 rounded-lg flex items-center justify-center">
            <textarea
              placeholder="Type here to leave a message"
              className="placeholder:text-[20px] placeholder:text-[#000] placeholder:font-bold text-[#000] text-[20px] font-bold w-[200px] text-center h-[120px] focus:outline-none"
            />
          </div>
          <div className="flex-1 flex justify-start items-center gap-2">
            <div className="w-[32px] h-[32px] rounded-full bg-black"></div>
            <p className={`text-[16px] text-[#5e5f6e]`}>Himanshu Chauhan</p>
          </div>
        </div>
        <div className="w-[65px] h-[65px] flex items-center-safe justify-center text-[24px] text-gray-500 bg-[#f7f7f8] rounded-full">
          <div>
            <FaGreaterThan />
          </div>
        </div>
      </div>
      {/* bottom operation */}
      <div className="w-[380px] flex items-center justify-between">
        <div className="w-[260px] h-[40px] rounded-[40px] bg-[#3c3c3f] flex items-center gap-1 justify-between px-3">
          {gradientColors.map((colorG) => (
            <div className={`w-[15px] h-[15px] rounded-full  ${colorG}`}></div>
          ))}
        </div>
        <div className="w-[110px] h-[40px] flex items-center justify-between py-1 bg-[#3c3c3f] rounded-[40px]">
          <div className="w-1/2  h-full border-r-[1px] border-gray-400 flex justify-center items-center text-red-600">
            <div>
              <X />
            </div>
          </div>
          <div className="w-1/2 h-full border-l-[1px] flex justify-center items-center text-green-500  border-gray-400">
            <div>
              <Check />
            </div>
          </div>
        </div>
      </div>
      {/* bottom operation */}
    </div>
  );
};

export default AddView;
