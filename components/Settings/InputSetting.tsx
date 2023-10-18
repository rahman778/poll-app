import React, { useState } from "react";

import { ArrowUturnRightIcon } from "@heroicons/react/24/outline";

import { Checkbox } from "@/components/Forms";

type IProps = {
   label: string;
   name: string;
   value: string;
   type?: string;
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
   resetValue: (name: string, _: string) => void;
};

const InputSetting: React.FC<IProps> = (props) => {
   const { label, name, onChange, value, type = "text", resetValue } = props;

   const [active, setActive] = useState(false);

   const handleCheckboxChange = (
      e: React.ChangeEvent<HTMLInputElement>
   ): void => {
      setActive(e.target.checked);

      // reset the value if active false
      if (!e.target.checked) {
         resetValue(name, "");
      }
   };

   return (
      <div>
         <Checkbox
            checked={active}
            name="setting"
            label={label}
            onchange={(e) => handleCheckboxChange(e)}
         />

         {active && (
            <div className="flex items-center gap-x-4 max-w-md mt-3">
               <ArrowUturnRightIcon className="w-5 h-5 text-gray-400 stroke-[3]" />
               <input
                  type={type}
                  className="input dark:[color-scheme:dark]"
                  name={name}
                  value={value}
                  onChange={onChange}
               />
            </div>
         )}
      </div>
   );
};

export default InputSetting;
