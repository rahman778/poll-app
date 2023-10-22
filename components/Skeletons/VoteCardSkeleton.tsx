import React from "react";

const VoteCardSkeleton: React.FC = () => {
   return (
      <div className="box w-full max-w-3xl box mt-8 mx-auto">
         <div className="animate-pulse">
            <div className="flex flex-col">
               <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded max-w-md"></div>

               <div className="grid grid-cols-6 gap-4 my-5">
                  <div className="h-2 bg-slate-300 dark:bg-slate-700 rounded col-span-1"></div>
                  <div className="h-2 bg-slate-300 dark:bg-slate-700 rounded col-span-1"></div>
               </div>
               <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded max-w-xs my-5"></div>
               <div className="flex items-center gap-x-4 mb-4">
                  <div className="rounded-full bg-slate-300 dark:bg-slate-700 h-6 w-6"></div>
                  <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-full max-w-md"></div>
               </div>
               <div className="flex items-center gap-x-4 mb-4">
                  <div className="rounded-full bg-slate-300 dark:bg-slate-700 h-6 w-6"></div>
                  <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-full max-w-md"></div>
               </div>
               <div className="flex items-center gap-x-4 mb-4">
                  <div className="rounded-full bg-slate-300 dark:bg-slate-700 h-6 w-6"></div>
                  <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-full max-w-md"></div>
               </div>
               <div className="flex items-center gap-x-4">
                  <div className="rounded-full bg-slate-300 dark:bg-slate-700 h-6 w-6"></div>
                  <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-full max-w-md"></div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default VoteCardSkeleton;
