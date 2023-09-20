"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useState, useRef, useEffect } from "react";


interface IProps {
   options: Option[];
   handleOptionClick: (type: Option) => void;
   name: string;
   placeholder: string;
   selectedItem: Option;
}

type Option = {
   label: string;
   value: string;
   icon?: JSX.Element;
}

const Dropdown: React.FC<IProps> = (props) => {
   const { options, handleOptionClick, name, placeholder, selectedItem } =
      props;

   const dropdownRef = useRef<HTMLDivElement>(null);

   const [isOpen, setIsOpen] = useState<boolean>(false);

   useEffect(() => {
      if (isOpen) {
         document.addEventListener("mousedown", handleClickOutside);
      } else {
         document.removeEventListener("mousedown", handleClickOutside);
      }

      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [isOpen]);

   const handleClickOutside = (
      event: React.MouseEvent<HTMLDivElement> | MouseEvent
   ) => {
      if (
         dropdownRef.current &&
         !dropdownRef.current.contains(event.target as Node)
      ) {
         setIsOpen(false);
      }
   };

   const toggleDropdown = () => {
      setIsOpen(!isOpen);
   };

   const onSelect = (option: Option) => {
      handleOptionClick(option);
      setIsOpen(false);
   };

   return (
      <div
         className="relative w-full"
         ref={dropdownRef}
         onMouseDown={handleClickOutside}
      >
         <input
            type="text"
            className="input cursor-default"
            onClick={toggleDropdown}
            placeholder={placeholder}
            value={selectedItem.label}
            name={name}
            readOnly
         />
         <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <ChevronDownIcon
               className={`h-5 w-5 transition-transform text-slate-500 stroke-2 ${
                  isOpen ? "rotate-180" : ""
               }`}
            />
         </div>

         <div
            className={`absolute top-[55px] min-w-full bg-white dark:bg-gray-800 max-h-56 rounded-md border border-gray-300 dark:border-gray-600 transform transition-all duration-300 ease-in-out shadow-md z-50 overflow-auto ${
               isOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
         >
            <ul>
               {options.map((option) => (
                  <li
                     className={`flex items-center space-x-3 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-3 cursor-default ${
                        option.value === selectedItem.value
                           ? "text-violet-600"
                           : "text-gray-900 dark:text-gray-300"
                     }`}
                     key={option.value}
                     onClick={() => onSelect(option)}
                  >
                     <span>{option.icon}</span>
                     <span>{option.label}</span>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
};

export default Dropdown;
