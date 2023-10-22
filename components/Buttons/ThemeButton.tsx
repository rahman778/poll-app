"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

const ThemeButton: React.FC = () => {
   const { resolvedTheme, setTheme } = useTheme();

   const [mounted, setMounted] = useState<boolean>(false);

   useEffect(() => setMounted(true), []);

   if (!mounted) return null;

   return (
      <button
         className="flex items-center justify-center rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
         onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
         {resolvedTheme === "dark" ? (
            <SunIcon className="h-5 w-5 text-orange-300" />
         ) : (
            <MoonIcon className="h-5 w-5 text-gray-800" />
         )}
      </button>
   );
};

export default ThemeButton;
