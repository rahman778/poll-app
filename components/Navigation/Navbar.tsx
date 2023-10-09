"use client";

import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
   ChartPieIcon,
   CalendarDaysIcon,
   XMarkIcon,
} from "@heroicons/react/24/outline";

import DesktopNavbar from "@/components/Navigation/DesktopNavbar";

import { Route } from "@/types/Route";

const routes: Route[] = [
   {
      id: 1,
      label: "Create Poll",
      path: "/create",
      icon: <ChartPieIcon className="h-5 w-5 text-violet-500 flex-shrink" />,
   },
   {
      id: 2,
      label: "Schedule Meeting",
      path: "/",
      icon: (
         <CalendarDaysIcon className="h-5 w-5 text-violet-500 flex-shrink" />
      ),
   },
];

const links: Route[] = [
   {
      id: 1,
      label: "Help Center",
      path: "/",
   },
   {
      id: 2,
      label: "Guides",
      path: "/",
   },
   {
      id: 3,
      label: "Support",
      path: "/",
   },
   {
      id: 4,
      label: "About",
      path: "/",
   },
];

const Navbar: React.FC = ({}) => {
   const { data: session } = useSession();
   const user = session?.user;

   const [isOpen, setIsOpen] = useState<boolean>(false);

   return (
      <>
         <DesktopNavbar routes={routes}>
            <button
               onClick={() => setIsOpen((prev) => !prev)}
               className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:text-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-violet-500"
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M4 6h16M4 12h16M4 18h16"
                  />
               </svg>
            </button>
         </DesktopNavbar>

         {/* Mobile Menu */}
         <div
            className={`p-2 absolute right-0 top-2 origin-top-right min-w-full transform transition-all duration-300 ease-in-out rounded z-50 overflow-auto ${
               isOpen
                  ? "scale-100 opacity-100 visible"
                  : "scale-90 opacity-0 invisible"
            }`}
         >
            <div className="rounded-lg shadow-lg ring-1 ring-gray-300 dark:ring-gray-700 bg-white dark:bg-gray-900 divide-y-2 divide-gray-50 dark:divide-gray-700">
               <div className="pt-5 pb-6 px-5">
                  <div className="flex items-center justify-between flex-row-reverse">
                     <div className="-mr-2">
                        <button
                           onClick={() => setIsOpen((prev) => !prev)}
                           className="bg-white dark:bg-gray-800 rounded-md p-1.5 inline-flex items-center justify-center text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-violet-500"
                        >
                           <XMarkIcon className="w-6 h-6" />
                           <span className="sr-only">Close menu</span>
                        </button>
                     </div>
                     <div>
                        <Link
                           href="/"
                           className="flex-shrink-0 flex items-center text-gray-900 dark:text-white"
                        >
                           Poll App
                        </Link>
                     </div>
                  </div>
                  <div className="mt-6">
                     <nav className="grid gap-y-6">
                        {routes.map((route) => (
                           <Link
                              key={route.id}
                              href={route.path}
                              className="flex items-center capitalize -m-3 p-3  rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:bg-opacity-50"
                           >
                              {route.icon}
                              <span className="ml-3 text-base font-medium text-gray-900 dark:text-gray-200">
                                 {route.label}
                              </span>
                           </Link>
                        ))}
                     </nav>
                  </div>
               </div>
               <div className="py-6 px-5 space-y-6">
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                     {links.map((link) => (
                        <Link
                           key={link.id}
                           href={link.path}
                           className="text-base font-medium capitalize text-gray-900 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                           {link.label}
                        </Link>
                     ))}
                  </div>
                  <div>
                     {user ? (
                        <li
                           className="button light-btn w-full flex items-center justify-center px-4 py-3"
                           onClick={() => signOut({ callbackUrl: '/' })}
                        >
                           Logout
                        </li>
                     ) : (
                        <>
                           <Link
                              href="/signup"
                              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-violet-600 hover:bg-violet-700"
                           >
                              Signup
                           </Link>
                           <p className="mt-6 text-center text-sm font-medium text-gray-500">
                              Existing user ? <Link href="/">login</Link>
                           </p>
                        </>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Navbar;
