import { ClerkProvider } from "@clerk/nextjs";
import "@/app/globals.css";
import { Inter } from "next/font/google";

import LeftSidebar from "@/components/layout/LeftSidebar";
import MainContainer from "@/components/layout/MainContainer";
import RightSidebar from "@/components/layout/RightSidebar";
import Bottombar from "@/components/layout/Bottombar";

export const metadata = {
  title: "Snapgram",
  description:
    "Socail Media Platform developed by Harsh Paliwal and Shivam Bhardwaj.",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-purple-2 text-light-1`}>
          <main className="flex flex-row">
            <LeftSidebar />
            <MainContainer>{children}</MainContainer>
            <RightSidebar />
          </main>
          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}
