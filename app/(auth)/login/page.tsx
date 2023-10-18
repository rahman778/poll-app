"use client";

import { ChangeEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import SVG from "react-inlinesvg";
import { useTheme } from "next-themes";

import AuthLayout from "@/components/Layout/AuthLayout";
import AnimateSpin from "@/components/Loaders/AnimateSpin";

function LoginPage() {
   const router = useRouter();
   const { theme } = useTheme();

   const [loading, setLoading] = useState(false);
   const [formValues, setFormValues] = useState({
      email: "",
      password: "",
   });

   const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
         setLoading(true);

         const res = await signIn("credentials", {
            redirect: false,
            email: formValues.email,
            password: formValues.password,
            callbackUrl: "/",
         });

         setLoading(false);

         if (!res?.error) {
            router.push("/");
         } else {
            toast.error("invalid credentials");
         }
      } catch (error: any) {
         setLoading(false);
      }
   };

   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormValues({ ...formValues, [name]: value });
   };

   return (
      <AuthLayout isLogin={true}>
         <form className="space-y-6" autoComplete="off" onSubmit={onSubmit}>
            <div>
               <label htmlFor="email" className="label">
                  Email
               </label>
               <div className="mt-1">
                  <input
                     required
                     type="email"
                     name="email"
                     value={formValues.email}
                     onChange={handleChange}
                     placeholder="Type your email"
                     className="input py-2.5"
                  />
               </div>
            </div>
            <div>
               <label htmlFor="password" className="label">
                  Password
               </label>
               <div className="mt-1">
                  <input
                     required
                     type="password"
                     name="password"
                     value={formValues.password}
                     onChange={handleChange}
                     placeholder="Type your password"
                     className="input py-2.5"
                  />
               </div>
            </div>
            <div className="flex items-center justify-between">
               <div>
                  <input
                     type="checkbox"
                     name="remember"
                     id="remember"
                     className="bg-slate-100 dark:bg-[#2D3748] text-violet-600 dark:text-violet-700 h-4 w-4 border-1 rounded-sm focus:outline-none focus:ring-offset-0 focus:border-violet-500 focus:ring-1 focus:ring-violet-400 dark:checked:bg-violet-600 checked:bg-violet-500"
                  />
                  <label htmlFor="remember" className="ml-2 label">
                     Remember me
                  </label>
               </div>
               <Link href="/signup" className="link">
                  Forgot your password?
               </Link>
            </div>
            <div>
               <button
                  type="submit"
                  className="button primary-btn w-full"
                  disabled={loading}
               >
                  {loading ? <AnimateSpin /> : "Log In"}
               </button>
            </div>
         </form>
         <div className="mt-6">
            <div className="relative">
               <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
               </div>
               <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-300">
                     Or continue with
                  </span>
               </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-3">
               <div>
                  <button
                     onClick={() => signIn("google", { callbackUrl: "/" })}
                     className="button light-btn w-full py-2 flex items-center"
                  >
                     <SVG
                        src="/google.svg"
                        style={{ fill: theme === "light" ? "#000" : "#fff" }}
                        width={25}
                        height={25}
                     />
                     <span className="ml-3">Google</span>
                  </button>
               </div>
               <div>
                  <button
                     onClick={() => signIn("github", { callbackUrl: "/" })}
                     className="button light-btn w-full py-2 flex items-center"
                  >
                     <SVG
                        src="/github.svg"
                        style={{ fill: theme === "light" ? "#000" : "#fff" }}
                        width={25}
                        height={25}
                     />
                     <span className="ml-3">Github</span>
                  </button>
               </div>
            </div>
         </div>
      </AuthLayout>
   );
}

export default LoginPage;
