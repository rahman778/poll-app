import AuthLayout from "@/components/Layout/AuthLayout";

function SignupPage() {
   return (
      <AuthLayout isLogin={false}>
         <form className="space-y-6" autoComplete="off">
            <div>
               <label htmlFor="name" className="label">
                  Name
               </label>
               <div className="mt-1">
                  <input
                     type="text"
                     name="name"
                     id="name"
                     placeholder="Type your name"
                     className="input py-2.5"
                  />
               </div>
            </div>
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
            <div>
               <button type="submit" className="button primary-btn w-full mt-1">
                  Sign up
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

            <div className="mt-6 grid grid-cols-1 gap-3"></div>
         </div>
      </AuthLayout>
   );
}

export default SignupPage;
