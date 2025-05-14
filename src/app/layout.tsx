import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Providers } from "@/redux/provider";
import sideLines from "../../public/sideLines.jpg";
import SubscribeBox from "@/components/SubscribeBox";
import Footer from "@/components/Footer";
import AddView from "@/components/CommunityWallPage/AddView";
export const metadata: Metadata = {
  title: "Himanshu Chauhan Portfolio",
  description: "Himanshu Chauhan Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AddView />
          <div className="mx-[100px]">
            <Navbar />
            {children}
            <div className="w-full min-h-screen flex justify-between">
              <div
                className="w-[30px] min-h-screen bg-repeat-y bg-top"
                style={{
                  backgroundImage: `url(${sideLines.src})`,
                  backgroundSize: "contain",
                }}
              ></div>
              <div className="flex-1 flex flex-col overflow-hidden">
                <SubscribeBox />
              </div>

              <div
                className="w-[30px] min-h-screen bg-repeat-y bg-top"
                style={{
                  backgroundImage: `url(${sideLines.src})`,
                  backgroundSize: "contain",
                }}
              ></div>
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
