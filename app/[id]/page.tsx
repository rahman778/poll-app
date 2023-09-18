"use client";

import React, { useState } from "react";

import {
   ArrowSmallRightIcon,
   ChartPieIcon,
   ClipboardIcon,
   EyeIcon,
   ShareIcon,
} from "@heroicons/react/24/outline";

import Checkbox from "@/components/forms/Checkbox";

type Props = {};

function PollPage({}: Props) {
   
   const [answers, setAnswers] = useState([
      { id: 1, answer: "answer1" },
      { id: 2, answer: "answer2" },
      { id: 3, answer: "answer3" },
      { id: 4, answer: "answer4" },
   ]);
   const [selectedAnswerId, setSelectedAnswerId] = useState(2);

   const handleCheckboxChange = (
      event: React.ChangeEvent<HTMLInputElement>
   ): void => {
      const { name, checked, value } = event.target;

      setSelectedAnswerId(2);
   };
   return (
      <div className="mb-10 flex flex-col items-center">
         <div className="w-full max-w-3xl bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-300 dark:ring-gray-700 rounded-md px-4 py-5 sm:p-6 lg:p-8 mt-8">
            <h1 className="strawpoll-title text-2xl text-gray-900 dark:text-gray-200 font-medium break-words">
               Favorite color?
            </h1>
            <div className="mt-2 text-sm text-gray-500">
               by a guest · 1 week ago
            </div>
            <div className="text-gray-500 mt-6">Make a choice:</div>
            <div className="mt-4">
               {answers.map((data) => (
                  <div className="mt-4" key={data.id}>
                     <Checkbox
                        checked={data.id === selectedAnswerId}
                        name={data.id.toString()}
                        label={data.answer}
                        onchange={(e) => handleCheckboxChange(e)}
                     />
                  </div>
               ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-x-4 lg:gap-x-6 mt-10">
               <button
                  type="button"
                  className="button py-2.5 primary-btn flex gap-x-2 w-full sm:w-32"
               >
                  <span>Vote</span>
                  <ArrowSmallRightIcon className="w-5 h-4 stroke-[3]" />
               </button>
               <button
                  type="button"
                  className="button py-2.5 secondary-btn flex gap-x-2 w-full sm:w-40 mt-5 sm:mt-0"
               >
                  <ChartPieIcon className="h-5 w-5 stroke-2" />
                  <span> Show results</span>
               </button>
            </div>
            {/* <div className="mt-5 sm:mt-0">
                  <button
                     type="button"
                     className="button py-2.5 secondary-btn flex gap-x-2  w-36"
                  >
                     <ShareIcon className="w-5 h-4" />
                     <span> Share</span>
                  </button>
               </div> */}
         </div>
         <div className="w-full max-w-3xl bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-300 dark:ring-gray-700 rounded-md mt-8">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
               <h2 className="text-lg text-gray-900 dark:text-gray-200 font-medium flex items-center gap-x-2.5">
                  <ShareIcon className="h-5 w-5 text-gray-400  stroke-2" />
                  <span>Share</span>
               </h2>
               <div className="text-xs text-gray-500 bg-gray-100 dark:text-gray-400 dark:bg-gray-800 px-2 py-1 rounded-md inline-flex items-center gap-x-2 border dark:border-gray-500">
                  <EyeIcon className="h-5 w-5 text-gray-400 stroke-2" />
                  <span> Only visible to you</span>
               </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700">
               <div className="px-4 py-6 sm:px-6 max-w-lg mx-auto">
                  <h6 className="text-sm">Share the link</h6>

                  <div className="relative mt-3 flex items-stretch flex-grow focus-within:z-10 truncate">
                     <input
                        type="text"
                        name=""
                        id=""
                        value="https://strawpoll.com/Qrgebk6kRZp"
                        className="input text-sm text-slate-500 dark:text-slate-400 py-2"
                        readOnly
                     />
                     <button className="absolute inset-y-px right-px rounded-md pl-3 pr-3 button">
                        <ClipboardIcon className="w-5 h-5 text-gray-400 stroke-2" />
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default PollPage;
