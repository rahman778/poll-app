import React from "react";

const ResultCardSkeleton = () => {
   return (
      <div className="boxw-full max-w-3xl box mt-8 mx-auto">
         <div className="animate-pulse">
            <div className="flex flex-col">
               <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded max-w-md"></div>

               <div className="grid grid-cols-6 gap-4 my-5">
                  <div className="h-2 bg-slate-300 dark:bg-slate-700 rounded col-span-1"></div>
                  <div className="h-2 bg-slate-300 dark:bg-slate-700 rounded col-span-1"></div>
               </div>

               <div className="md:flex items-center md:gap-x-6 space-y-8">
                  <div className="flex-grow mt-4 space-y-6">
                     <div className="mb-1">
                        <div className="h-2 bg-slate-300 rounded dark:bg-slate-700 max-w-[250px] mb-2"></div>
                        <div className="bg-slate-300 dark:bg-slate-700 h-4 rounded-xl"></div>
                     </div>
                     <div className="mb-1">
                        <div className="h-2 bg-slate-300 rounded dark:bg-slate-700 max-w-[250px] mb-2"></div>
                        <div className="bg-slate-300 dark:bg-slate-700 h-4 rounded-xl"></div>
                     </div>
                     <div className="mb-1">
                        <div className="h-2 bg-slate-300 rounded dark:bg-slate-700 max-w-[250px] mb-2"></div>
                        <div className="bg-slate-300 dark:bg-slate-700 h-4 rounded-xl"></div>
                     </div>
                     <div className="mb-1">
                        <div className="h-2 bg-slate-300 rounded dark:bg-slate-700 max-w-[250px] mb-2"></div>
                        <div className="bg-slate-300 dark:bg-slate-700 h-4 rounded-xl"></div>
                     </div>
                  </div>
                  <div className="flex-shrink-0 relative">
                     <div className="max-w-[275px] mx-auto">
                        <div className="rounded-full bg-slate-300 dark:bg-slate-700 h-56 w-56"></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ResultCardSkeleton;
