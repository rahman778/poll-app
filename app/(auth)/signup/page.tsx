"use client";

import { ChangeEvent, useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";

import { SIGN_UP } from "@/lib/gql-calls";

import AuthLayout from "@/components/Layout/AuthLayout";
import AnimateSpin from "@/components/Loaders/AnimateSpin";

function SignupPage() {
   const [loading, setLoading] = useState(false);
   const [formValues, setFormValues] = useState({
      name: "",
      email: "",
      password: "",
   });

   const [signup] = useMutation(SIGN_UP, { errorPolicy: "all" });

   const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
         setLoading(true);

         const { name, email, password } = formValues;

         const { data, errors } = await signup({
            variables: {
               name,
               email,
               password,
            },
         });

         if (errors?.length) {
            toast.error(errors[0].message, {
               style: {
                  fontSize: "14px",
               },
            });
            setLoading(false);
            return;
         }

         if (data) {
            await signIn("credentials", {
               email: email,
               password: password,
               redirect: true,
               callbackUrl: "/",
            });
         }

         setLoading(false);
      } catch (error: any) {
         setLoading(false);
      }
   };

   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormValues({ ...formValues, [name]: value });
   };

   return (
      <AuthLayout isLogin={false}>
         <form className="space-y-6" autoComplete="off" onSubmit={onSubmit}>
            <div>
               <label htmlFor="name" className="label">
                  Name
               </label>
               <div className="mt-1">
                  <input
                     required
                     type="text"
                     name="name"
                     value={formValues.name}
                     onChange={handleChange}
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
            <div>
               <button
                  type="submit"
                  className="button primary-btn w-full mt-1"
                  disabled={loading}
               >
                  {loading ? <AnimateSpin /> : "Sign up"}
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
