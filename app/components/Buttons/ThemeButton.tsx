"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

function ThemeButton() {
   const { resolvedTheme, setTheme } = useTheme();

   const [mounted, setMounted] = useState<boolean>(false);

   useEffect(() => setMounted(true), []);

   if (!mounted) return null;

   return (
      <button
         //className={`w-fit absolute right-5 top-2 p-2 rounded-md hover:scale-110 active:scale-100 duration-200 bg-slate-200 dark:bg-[#212933]`}
         className="flex items-center justify-center rounded-lg p-2 bg-slate-200 dark:bg-[#212933] transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-700"
         onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
         {resolvedTheme === "dark" ? (
            <SunIcon className="h-5 w-5 text-orange-300" />
         ) : (
            <MoonIcon className="h-5 w-5 text-slate-800" />
         )}
      </button>
   );
}

export default ThemeButton;
