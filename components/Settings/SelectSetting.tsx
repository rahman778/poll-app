import React, { useState } from "react";

import { ArrowUturnRightIcon } from "@heroicons/react/24/outline";

import Checkbox from "@/components/Forms/Checkbox";
import Dropdown from "@/components/Forms/Dropdown";

interface Option {
   value: string;
   label: string;
}

type IProps = {
   label: string;
   name: string;
   options: Option[];
   selectedOption: string;
   placeholder: string;
   handleSelect: (val: string) => void;
   resetValue: (name:string, _:string) => void;
};

const SelectSetting: React.FC<IProps> = (props) => {
   const { label, name, options, selectedOption, placeholder, handleSelect, resetValue } =
      props;

   const [active, setActive] = useState(false);

   const handleCheckboxChange = (
      e: React.ChangeEvent<HTMLInputElement>
   ): void => {
      setActive(e.target.checked);

        // reset the value if active false
        if(!e.target.checked) {
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
               <Dropdown
                  options={options}
                  name={name}
                  selectedItem={selectedOption}
                  placeholder={placeholder}
                  handleOptionClick={(val) => handleSelect(val)}
               />
            </div>
         )}
      </div>
   );
};

export default SelectSetting;
