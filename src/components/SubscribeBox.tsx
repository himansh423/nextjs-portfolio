"use client";
import { fontColor } from "@/library/constants/colors";
import silver from "../../public/silversurfer.png";
import Image from "next/image";
import { Send } from "lucide-react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { subscribeAction } from "@/redux/subscribeSlice";
import { RootState } from "@/redux/store";
import { Subscribe } from "@/library/zodSchema/SubscribeSchema";

type SubscribeData = z.infer<typeof Subscribe>;

const SubscribeBox = () => {
  const { message } = useSelector((store: RootState) => store.subscribe);
  const dispatch = useDispatch();
  const {
    register,
    setError,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SubscribeData>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(Subscribe),
  });

  const onSubmit: SubmitHandler<SubscribeData> = async (
    data: SubscribeData
  ) => {
    const email = data.email;
    try {
      const { data } = await axios.post("/api/subscribe", { email });
      dispatch(subscribeAction.setMessage({ data: data.message }));
      reset();
    } catch (error: unknown) {
      dispatch(subscribeAction.setMessage("Something went wrong"));
      if (error instanceof Error)
        setError("root", {
          type: "manual",
          message: error.message,
        });
    }
  };
  return (
    <div className="w-full  py-[70px] max-sm:px-2">
      <div className="w-full h-[500px] overflow-hidden bg-[#3C3C3F] rounded-2xl flex flex-col justify-between max-md:h-[600px]">
        {/*  */}
        <div className="w-full flex">
          <div className="w-[50px] h-[50px]   max-m:w-[20px]"></div>
          <div
            className={`flex-1 h-[50px]  border-x-[1px] border-[#d4d4d8]`}
          ></div>
          <div className="w-[50px] h-[50px]   max-m:w-[20px] "></div>{" "}
        </div>
        {/*  */}

        {/*  */}
        <div className="w-full flex flex-1">
          <div
            className={`w-[50px] h-full  border-y-[1px] border-[#d4d4d8]  max-m:w-[20px]`}
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
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-[425px] h-[50px] mt-12 relative max-sm:w-full"
              >
                <input
                  {...register("email")}
                  type="text"
                  placeholder="Your email address"
                  className="w-full h-full focus:outline-none border-[1px] border-[#d4d4d6]  px-[12px] placeholder:text-[#d4d4d6] rounded-[80px] text-[#faf8fc] focus:border-[2px] focus:border-[#faf8fc] max-m:pr-[20px]"
                />
                {errors.email && (
                  <p className="text-red-500 text-[14px] mt-2">
                    {errors.email.message}
                  </p>
                )}

                <p className="text-[#d1d5db] text-[14px] mt-2">
                  {message && message}
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="absolute w-[100px] bg-[#ffffff] h-[45px] top-[50%] translate-y-[-50%] right-1 rounded-[80px] font-semibold text-[14px] z-10 max-m:w-[50px] max-m:text-[9px] max-m:flex max-m:justify-center max-m:items-center"
                >
                  {isSubmitting ? (
                    <svg
                      className="animate-spin h-5 w-5 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  ) : (
                    <>
                      <p className={`${fontColor.primary} max-m:hidden`}>
                        Subscribe
                      </p>
                      <p className={`${fontColor.primary} m:hidden`}>
                        <Send />
                      </p>
                    </>
                  )}
                </button>
              </form>

              <p
                className={`text-[16px] text-[#d1d5db] mt-10 text-nowrap max-sm:text-wrap`}
              >
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
            className={`w-[50px] h-full  border-y-[1px] border-[#d4d4d8]  max-m:w-[20px]`}
          ></div>
        </div>
        {/*  */}

        {/*  */}
        <div className="w-full flex">
          <div className="w-[50px] h-[50px]  max-m:w-[20px] "></div>
          <div
            className={`flex-1 h-[50px]  border-x-[1px] border-[#d4d4d8]`}
          ></div>
          <div className="w-[50px] h-[50px]  max-m:w-[20px] "></div>{" "}
        </div>

        {/*  */}
      </div>
    </div>
  );
};

export default SubscribeBox;
