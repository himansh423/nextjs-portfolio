import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Providers } from "@/redux/provider";
import Footer from "@/components/Footer";
import sideLines from "../../public/sideLines.jpg";
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
              <Footer />
            </div>

            <div
              className="w-[30px] min-h-screen bg-repeat-y bg-top"
              style={{
                backgroundImage: `url(${sideLines.src})`,
                backgroundSize: "contain",
              }}
            ></div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
