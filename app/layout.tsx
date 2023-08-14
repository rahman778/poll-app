import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import Providers from "@/app/Providers";
import ThemeButton from "@/components/Buttons/ThemeButton";
import Navbar from "@/components/Navigation/Navbar";

const poppins = Poppins({ weight: ["400", "500", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
   title: "SnapPoll",
   description:
      "Engage in meaningful polls and surveys on SnapPoll. Cast your vote, express your opinions, and see real-time results. Join the community and make your voice heard!",
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en" suppressHydrationWarning>
         <body className={`${poppins.className} bg-[#EDF2F7] dark:bg-[#2D3748]`}>
            <Providers>
               <Navbar />
               <ThemeButton />
               <main>{children}</main>
            </Providers>
         </body>
      </html>
   );
}
