"use client";

import React from "react";
import { ClipboardIcon } from "@heroicons/react/24/outline";

type IProps = {
   value: string;
   handleCopyClick: (value: string) => void;
}

const CopyText: React.FC<IProps> = ({ value, handleCopyClick }) => {
   return (
      <div className="relative mt-3 flex items-stretch flex-grow focus-within:z-10 truncate">
         <input
            type="text"
            value={value}
            className="input text-sm text-slate-500 dark:text-slate-400 pr-10 py-2"
            readOnly
         />
         <button
            className="absolute inset-y-px right-px rounded-md pl-3 pr-3 button"
            onClick={() => handleCopyClick(value)}
         >
            <ClipboardIcon className="w-5 h-5 text-gray-400 stroke-2" />
         </button>
      </div>
   );
};

export default CopyText;
