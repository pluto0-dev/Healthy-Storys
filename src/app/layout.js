import Navbar from "@/components/navbar/Navbar";
import { Inter } from "next/font/google";
import "./globals.css";
// import Fighting from "@/components/Fighting/Fighting";
import PopUp from "@/components/Encourage/page";
import Calorie from "@/components/Calorie/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HealthyStory",
  description: "Next.js starter app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
          {children}
          <PopUp />
          <Calorie />
          {/* <Fighting /> */}
      </body>
    </html>
  );
}
