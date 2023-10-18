import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";

import "@/app/globals.css";
import Providers from "@/app/Providers";

const poppins = Poppins({
   weight: ["400", "500", "600", "700"],
   subsets: ["latin"],
});

export const metadata: Metadata = {
   title: "PulsePoll",
   description:
      "Engage in meaningful polls and surveys on PulsePoll. Cast your vote, express your opinions, and see real-time results. Join the community and make your voice heard!",
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en" suppressHydrationWarning>
         <body className={`${poppins.className} bg-[#EDF2F7] dark:bg-gray-800`}>
            <Providers>
               {children}
               <Toaster
                  toastOptions={{
                     style: {
                        fontSize: "14px",
                     },
                  }}
               />
            </Providers>
         </body>
      </html>
   );
}
