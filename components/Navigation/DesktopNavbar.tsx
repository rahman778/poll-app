import Link from "next/link";

import ThemeButton from "@/components/Buttons/ThemeButton";

import { Route } from "./Navbar";

type Props = {
   children: React.ReactNode;
   routes: Route[];
};

function DesktopNavbar({ children, routes }: Props) {
   return (
      <nav className="sticky bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-300 dark:ring-gray-700">
         <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
            <div className="flex justify-between h-16">
               <div className="flex truncate">
                  <Link
                     href="/"
                     className="flex items-center flex-shrink-0 text-gray-700 dark:text-gray-200"
                  >
                     logo
                  </Link>
                  <div className="hidden lg:ml-8 lg:flex lg:space-x-8">
                     {routes.map((route) => (
                        <Link
                           key={route.id}
                           href={route.path}
                           className="inline-flex items-center text-sm font-medium capitalize text-gray-700 dark:text-gray-100  hover:text-gray-900 dark:hover:text-gray-300 border-transparent hover:border-gray-300 border-b-2 px-1 pt-1 whitespace-nowrap"
                        >
                           {route.label}
                        </Link>
                     ))}
                  </div>
               </div>
               <div className="flex items-center ">
                  <ThemeButton />
                  <div className="hidden lg:ml-2 lg:flex lg:items-center">
                     <div className="flex items-center space-x-3 ">
                        <Link href="" className="button transparent-btn">
                           Login
                        </Link>
                        <Link href="" className="button primary-btn">
                           Signup
                        </Link>
                     </div>
                  </div>
                  {/* Mobile button */}
                  <div className="flex items-center px-2 ml-2 lg:hidden">
                     {children}
                  </div>
               </div>
            </div>
         </div>
      </nav>
   );
}

export default DesktopNavbar;
