import React from "react";

type Props = {
   checked: boolean;
   label?: string;
   name: string;
   onchange: (type: React.ChangeEvent<HTMLInputElement>) => void;
};

function Checkbox(props: Props) {
   const { checked, label, name, onchange } = props;
   return (
      <div className="w-full flex items-center gap-x-2">
         <input
            type="checkbox"
            name={name}
            onChange={onchange}
            checked={checked}
            className="bg-slate-100 dark:bg-[#2D3748] text-violet-600 dark:text-violet-700 h-5 w-5 border-1 rounded-full focus:outline-none focus:ring-offset-0 focus:border-violet-500 focus:ring-1 focus:ring-violet-400 dark:checked:bg-violet-600 checked:bg-violet-500"
         />
         <label className="text-sm" htmlFor="some_id">
            {label}
         </label>
      </div>
   );
}

export default Checkbox;
