
import VerifyOtp from "@/components/Admin/VerifyOtp";
import sideLines from "../../../../../public/sideLines.jpg";

const page = () => {
  return (
    <div className="w-full min-h-screen flex justify-between">
      <div
        className="w-[30px] min-h-screen bg-repeat-y bg-top max-md:hidden"
        style={{
          backgroundImage: `url(${sideLines.src})`,
          backgroundSize: "contain",
        }}
      ></div>
      <div className="flex-1 flex flex-col overflow-hidden">
       <VerifyOtp/>
      </div>

      <div
        className="w-[30px] min-h-screen bg-repeat-y bg-top max-md:hidden"
        style={{
          backgroundImage: `url(${sideLines.src})`,
          backgroundSize: "contain",
        }}
      ></div>
    </div>
  );
};

export default page;
