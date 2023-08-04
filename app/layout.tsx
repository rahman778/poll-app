import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import Providers from "@/app/Providers";
import ThemeButton from "@/app/components/Buttons/ThemeButton";

const poppins = Poppins({ weight: ["400", "700"], subsets: ["latin"] });

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
         <body className={`${poppins.className} bg-slate-50 dark:bg-[#111827]`}>
            <Providers>
               <ThemeButton />
               <main>{children}</main>
            </Providers>
         </body>
      </html>
   );
}
