import React from "react";
import toast from "react-hot-toast";
import { ShareIcon } from "@heroicons/react/24/outline";

import { CopyText } from "@/components/Forms";

type IProps = {
   value: string;
};

const ShareCard: React.FC<IProps> = ({ value }) => {
   const handleCopyClick = (val: string) => {
      const textArea = document.createElement("textarea");
      textArea.value = val;

      document.body.appendChild(textArea);

      textArea.select();

      document.execCommand("copy");

      document.body.removeChild(textArea);

      toast.success("Copied to clipboard!");
   };

   return (
      <>
         <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h2 className="text-lg text-gray-900 dark:text-gray-200 font-medium flex items-center gap-x-2.5">
               <ShareIcon className="h-5 w-5 text-gray-400  stroke-2" />
               <span>Share</span>
            </h2>
            {/* <div className="text-xs text-gray-500 bg-gray-100 dark:text-gray-400 dark:bg-gray-800 px-2 py-1 rounded-md inline-flex items-center gap-x-2 border dark:border-gray-500">
               <EyeIcon className="h-5 w-5 text-gray-400 stroke-2" />
               <span> Only visible to you</span>
            </div> */}
         </div>
         <div className="border-t border-gray-200 dark:border-gray-700">
            <div className="px-4 py-6 sm:px-6 max-w-lg mx-auto">
               <h6 className="text-sm">Share the link</h6>
               <CopyText
                  value={value}
                  handleCopyClick={(val) => handleCopyClick(val)}
               />
            </div>
         </div>
      </>
   );
};

export default ShareCard;
