import Link from "next/link";

import AuthLayout from "@/components/Layout/AuthLayout";

function LoginPage() {
   return (
    <AuthLayout isLogin={true}>
      <form className="space-y-6" autoComplete="off">
         <div>
            <label htmlFor="email" className="label">
               Email
            </label>
            <div className="mt-1">
               <input
                  type="text"
                  name="email"
                  id="email"
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
                  type="password"
                  name="password"
                  id="password"
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
            <button type="submit" className="button primary-btn w-full">
               Log in
            </button>
         </div>
      </form>
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          <div  className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-300">
            Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3"></div>
      </div>
      </AuthLayout>
   );
}

export default LoginPage;
