import Link from "next/link";

import { Logo } from "@/components/Navigation";
import ThemeButton from "@/components/Buttons/ThemeButton";

type IProps = {
   isLogin: boolean;
   children: React.ReactNode;
};

const AuthLayout: React.FC<IProps> = (props) => {
   const { isLogin, children } = props;
   return (
      <>
         <div className="flex justify-end p-4">
            <div className="flex items-center text-sm space-x-4">
               <ThemeButton />
               <span>
                  {isLogin
                     ? "Dont't have an account yet?"
                     : "Already have an account?"}
               </span>
               <Link
                  href={isLogin ? "/signup" : "/login"}
                  className="button light-btn"
               >
                  {isLogin ? "Sign up" : "Log in"}
               </Link>
            </div>
         </div>

         <main className="text-gray-600 dark:text-gray-400 min-h-[93vh] flex flex-col justify-center mx-2 sm:mx-0">
            <div className="flex flex-col justify-center mt-0 py-6 sm:px-6 lg:px-8">
               <div className="sm:mx-auto sm:w-full sm:max-w-md">
                  <Link href="/" className="flex justify-center">
                     <Logo width={150} />
                  </Link>
                  <h2 className="mt-6 text-center text-3xl font-semibold text-gray-900 dark:text-white">
                     {isLogin
                        ? "Log in to your account"
                        : "Create a free account"}
                  </h2>
                  <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                     <span>Or</span>
                     <Link
                        href={isLogin ? "/signup" : "/login"}
                        className="link ml-1.5"
                     >
                        {isLogin
                           ? "create a free account"
                           : "log in to your account"}
                     </Link>
                  </p>
               </div>

               <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md space-y-8">
                  <div className="box">{children}</div>
               </div>
            </div>
         </main>
      </>
   );
};

export default AuthLayout;
