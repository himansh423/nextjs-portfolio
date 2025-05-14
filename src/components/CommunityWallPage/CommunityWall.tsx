import { borderColor } from "@/library/constants/colors";
import { Plus } from "lucide-react";

const cardsData = [
  {
    message:
      "Hi there! A friend on discord shared this with me. Such a cool idea!",
    user: "Himanshu Chauhan",
  },
  {
    message: "This deserves recognition!",
    user: "Meena Kumari",
  },
  {
    message: "Just amazing work. Loved it!",
    user: "Ravi S.",
  },
  {
    message: "Follow your passion and stay creative!",
    user: "Nisha P.",
  },
  {
    message: "Super creative! Keep it up.",
    user: "Aman Raj",
  },
  {
    message: "Totally worth sharing!",
    user: "Priya D.",
  },
  {
    message: "Awesome execution!",
    user: "Karan V.",
  },
  {
    message: "Next-level stuff!",
    user: "Anjali Singh",
  },
  {
    message: "Mind = Blown 🤯",
    user: "Yash G.",
  },
];

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

const rotations = [
  "-rotate-6",
  "-rotate-3",
  "rotate-0",
  "rotate-3",
  "rotate-6",
];

const CommunityWall = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="w-full h-[60px] mt-3.5 flex justify-end items-center px-5">
        <div className="w-[180px] h-[50px] bg-gradient-to-br from-purple-600 via-yellow-500/30 rounded-[50px] to-red-500 flex items-center justify-center font-semibold cursor-pointer gap-1 border-[1px]">
          <p className="text-[16px] text-black">Add Your Views</p>
          <div className="mt-[2px]">
            <Plus size={18} />
          </div>
        </div>
      </div>

      <div className="w-full min-h-screen flex justify-center items-start py-20 px-10 bg-[#f4f4f4] relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-36">
          {cardsData.map((card, index) => {
            const gradient = gradientColors[index % gradientColors.length];
            const rotation = rotations[index % rotations.length];

            return (
              <div key={index} className={`relative w-[250px] h-[300px]`}>
                {/* Back Card */}
                <div
                  className={`absolute top-0 left-0 w-[250px] h-[300px] rounded-xl bg-white flex items-center justify-center ${borderColor.primary} border-[1px]`}
                >
                  <div
                    className={`w-[230px] h-[280px] rounded-lg bg-[#edeef0] shadow-inner ${borderColor.primary} border-[1px]`}
                  ></div>
                </div>

                {/* Front Card */}
                <div
                  className={`absolute top-0 left-0 z-10 w-[250px] h-[300px] rounded-xl bg-white p-[10px] flex flex-col gap-1 ${borderColor.primary} border-[1px] transform ${rotation}`}
                >
                  <div
                    className={`relative w-full h-[236px] ${gradient} shadow-inner rounded-lg flex items-center justify-center px-5`}
                  >
                    {/* Decorative Star */}
                    <svg
                      className="absolute top-2 right-2 w-5 h-5 text-white opacity-90"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.572-.955L10 0l2.94 5.955 6.572.955-4.756 4.635 1.122 6.545z" />
                    </svg>

                    <p className="text-[20px] text-center text-[#000] font-bold drop-shadow">
                      {card.message}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-[32px] h-[32px] rounded-full bg-black flex items-center justify-center font-bold">
                      {card.user.charAt(0)}
                    </div>
                    <p className="text-[15px] text-[#5e5f6e]">{card.user}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className={`w-full h-[100vh] bg-gradient-to-t  from-gray-600 via-gray-600/30 to-transparent absolute bottom-0 left-0 z-20 flex items-end justify-center pb-10`}
        >
          <div
            className={`w-[60px] h-[60px] bg-black rounded-full flex items-center justify-center`}
          >
            <div className={`text-white cursor-pointer`}>
              <Plus size={30} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityWall;
