import CommunityWall from "@/components/CommunityWallPage/CommunityWall";
import sideLines from "../../../public/sideLines.jpg";

const page = () => {
  return (
    <div className="w-full min-h-screen flex justify-between relative">
      <div
        className="w-[30px] min-h-screen bg-repeat-y bg-top"
        style={{
          backgroundImage: `url(${sideLines.src})`,
          backgroundSize: "contain",
        }}
      ></div>

      <div className="flex-1 flex flex-col overflow-hidden"></div>
      <CommunityWall />
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
