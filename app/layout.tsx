import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import Providers from "@/app/Providers";

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
         <body
            className={`${poppins.className} bg-[#EDF2F7] dark:bg-gray-800`}
         >
            <Providers>
               <Navbar />
               <main className="max-w-6xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
                  
                  {children}
               </main>
            </Providers>
         </body>
      </html>
   );
}
