"use client";
import React, { useState } from "react";
import Link from "next/link";

import {
   ArrowUturnRightIcon,
   XMarkIcon,
   PlusIcon,
} from "@heroicons/react/24/outline";

import Checkbox from "@/components/Forms/Checkbox";
import Dropdown from "@/components/Forms/Dropdown";

import { Setting } from "@/types/Setting";

type Option = {
   label: string;
   value: string;
}

type Input = {
   name: string;
   value: string;
}

function CreatePoll() {
   const [selectedVal, setSelectedVal] = useState<Option>({
      value: "",
      label: "",
   });
   const [inputs, setInputs] = useState<Input[]>([
      { name: "", value: "" },
      { name: "", value: "" },
   ]);
   const [settings, setSettings] = useState<Setting>({
      multiple: false,
      deadline: false,
   });

   const onQuesionTypeSelect = (opt: Option): void => {
      console.log("opt", opt);
   };

   const addInput = (): void => {
      setInputs([...inputs, { name: "", value: "" }]);
   };

   const removeInput = (index: number): void => {
      const newInputs = [...inputs];
      newInputs.splice(index, 1);
      setInputs(newInputs);
   };

   const handleCheckboxChange = (
      event: React.ChangeEvent<HTMLInputElement>
   ): void => {
      const { name, checked } = event.target;

      setSettings((prevSettings) => ({
         ...prevSettings,
         [name]: checked,
      }));
   };

   const onAnswerChange = (val: string, idx: number) => {
      const newInputs = [...inputs];
      newInputs[idx].value = val;
      setInputs(newInputs);
   };

   return (
      <div className="min-h-[90vh] flex flex-col items-center justify-center py-8">
         <h1 className="text-2xl sm:text-3xl leading-7 font-semibold text-gray-900 dark:text-gray-100 sm:truncate">
            Create a Poll
         </h1>
         <div className="w-full max-w-3xl box mt-8">
            <form>
               <div>
                  <input
                     type="text"
                     name=""
                     id=""
                     placeholder="Type your question here"
                     className="input"
                  />
               </div>

               <div className="mt-5">
                  {inputs.map((input, indx) => (
                     <div className="mt-3 relative" key={indx}>
                        <input
                           type="text"
                           name={input.name}
                           id={input.name}
                           value={input.value}
                           placeholder={`Answer # ${indx + 1}`}
                           className="input pr-8"
                           onChange={(e) =>
                              onAnswerChange(e.target.value, indx)
                           }
                        />
                        <span
                           onClick={() => removeInput(indx)}
                           className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer"
                        >
                           <XMarkIcon className="w-4 h-4 text-gray-400 stroke-[3]" />
                        </span>
                     </div>
                  ))}

                  <button
                     type="button"
                     className="button gap-x-2 bg-slate-100 text-gray-600 dark:text-gray-100 dark:bg-[#2D3748] hover:bg-slate-200 dark:hover:bg-gray-600 border-slate-500 py-2.5 mt-3"
                     onClick={addInput}
                  >
                     <PlusIcon className="w-4 h-4 text-gray-400 stroke-[3]" />
                     <span>Add an answer</span>
                  </button>
               </div>

               <div className="space-y-6 py-6 border-y border-gray-300 dark:border-gray-700 mt-8">
                  <h3 className="text-lg leading-5 font-medium text-gray-900 dark:text-gray-100">
                     Settings
                  </h3>

                  <div>
                     <Checkbox
                        checked={settings.multiple}
                        name="multiple"
                        label="Allow more than one answer"
                        onchange={(e) => handleCheckboxChange(e)}
                     />
                     {settings.multiple && (
                        <div className="flex items-center gap-x-4 max-w-md mt-3">
                           <ArrowUturnRightIcon className="w-5 h-5 text-gray-400 stroke-[3]" />
                           <Dropdown
                              options={[
                                 {
                                    value: "unlimit",
                                    label: "unlimit",
                                 },
                                 {
                                    value: "2",
                                    label: "option 2",
                                 },
                                 {
                                    value: "3",
                                    label: "option 3",
                                 },
                              ]}
                              name="type"
                              selectedItem={selectedVal}
                              placeholder="Number of allowed answers"
                              handleOptionClick={(opt) =>
                                 onQuesionTypeSelect(opt)
                              }
                           />
                        </div>
                     )}
                  </div>

                  <div className="">
                     <Checkbox
                        checked={settings.deadline}
                        name="deadline"
                        label="Close poll on a scheduled date"
                        onchange={(e) => handleCheckboxChange(e)}
                     />
                     {settings.deadline && (
                        <div className="flex items-center gap-x-4 max-w-md mt-3">
                           <ArrowUturnRightIcon className="w-5 h-5 text-gray-400 stroke-[3]" />
                           <input
                              type="datetime-local"
                              className="input dark:[color-scheme:dark]"
                              name=""
                              id=""
                           />
                        </div>
                     )}
                  </div>
               </div>
               <div className="flex justify-end mt-6">
               <Link href="/123" className="button primary-btn w-48">
                  PUBLISH
               </Link>
               </div>
            </form>
         </div>
      </div>
   );
}

export default CreatePoll;
