import React from "react";

const ShareCardSkeleton: React.FC = () => {
   return (
      <div className="box w-full max-w-3xl box mt-8 mx-auto">
         <div className="animate-pulse">
            <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-24"></div>
            <div className="px-4 pt-6 sm:px-6 max-w-lg mx-auto">
               <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-28"></div>
               <div className="rounded-md bg-slate-300 dark:bg-slate-700 h-8 w-full mt-5"></div>
            </div>
         </div>
      </div>
   );
};

export default ShareCardSkeleton;
