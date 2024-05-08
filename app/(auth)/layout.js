import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
export const metadata = {
  title: "Auth",
  description: "Next 14 Social Media Platform",
};
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-purple-2`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
