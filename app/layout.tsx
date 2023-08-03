import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "SnapPoll",
   description:
      "Engage in meaningful polls and surveys on SnapPoll. Cast your vote, express your opinions, and see real-time results. Join the community and make your voice heard!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <body className={inter.className}>{children}</body>
      </html>
   );
}
