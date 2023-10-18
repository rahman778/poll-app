"use client";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { CREATE_POLL } from "@/lib/gql-calls";

import { XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";

import AnimateSpin from "@/components/Loaders/AnimateSpin";
import { InputSetting, SelectSetting } from "@/components/Settings";

type Input = {
   value: string;
};

function CreatePoll() {
   const router = useRouter();

   const [inputs, setInputs] = useState<Input[]>([
      { value: "" },
      { value: "" },
   ]);

   const [formValues, setFormValues] = useState({
      question: "",
      allowedVotes: "",
      deadline: "",
   });

   const [createPoll, { loading }] = useMutation(CREATE_POLL, {
      errorPolicy: "all",
   });

   const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!formValues.question) {
         toast.error("Please type a question");
         return;
      }

      const nonEmptyInputs = inputs.filter(
         (input) => input.value.trim() !== ""
      );

      if (nonEmptyInputs.length < 2) {
         toast.error("There should be atleast 2 options");
         return;
      }

      try {
         const { data, errors } = await createPoll({
            variables: {
               text: formValues.question,
               allowedVotes: formValues.allowedVotes,
               deadline: formValues.deadline,
               options: nonEmptyInputs.map((answer) => answer.value),
            },
         });

         if (errors?.length) {
            toast.error(errors[0]?.message);
            return;
         }

         if (data.createPoll) {
            router.push(`/${data.createPoll.id}`);
         }
      } catch (error) {}
   };

   const addInput = (): void => {
      if (inputs.length === 8) {
         toast.error("You can add a maximum of 8 options");
         return;
      }
      setInputs([...inputs, { value: "" }]);
   };

   const removeInput = (index: number): void => {
      const newInputs = [...inputs];
      newInputs.splice(index, 1);
      setInputs(newInputs);
   };

   const onAnswerChange = (val: string, idx: number) => {
      const newInputs = [...inputs];
      newInputs[idx].value = val;
      setInputs(newInputs);
   };

   const handleChange = (name: string, value: string) => {
      setFormValues({ ...formValues, [name]: value });
   };

   return (
      <div className="min-h-[90vh] flex flex-col items-center justify-center py-8">
         <h1 className="text-2xl sm:text-3xl leading-7 font-semibold text-gray-900 dark:text-gray-100 sm:truncate">
            Create a Poll
         </h1>
         <div className="w-full max-w-3xl box mt-8">
            <form onSubmit={onSubmit}>
               <div>
                  <input
                     required
                     type="text"
                     name="question"
                     value={formValues.question}
                     onChange={(e) => handleChange("question", e.target.value)}
                     placeholder="Type your question here"
                     className="input"
                  />
               </div>

               <div className="mt-5">
                  {inputs.map((input, indx) => (
                     <div className="mt-3 relative" key={indx}>
                        <input
                           type="text"
                           name={`answer-${indx}`}
                           value={input.value}
                           placeholder={`Answer # ${indx + 1}`}
                           className="input pr-8"
                           onChange={(e) =>
                              onAnswerChange(e.target.value, indx)
                           }
                        />
                        {inputs.length > 2 && (
                           <span
                              onClick={() => removeInput(indx)}
                              className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer"
                           >
                              <XMarkIcon className="w-4 h-4 text-gray-400 stroke-[3]" />
                           </span>
                        )}
                     </div>
                  ))}

                  <button
                     type="button"
                     className="button gap-x-2 bg-slate-100 text-gray-600 dark:text-gray-100 dark:bg-[#2D3748] hover:bg-slate-200 dark:hover:bg-gray-600 border-slate-500 py-2.5 mt-4"
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
                     <SelectSetting
                        name="allowedVotes"
                        label="Allow more than one answer"
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
                        selectedOption={formValues.allowedVotes}
                        handleSelect={(val) =>
                           handleChange("allowedVotes", val)
                        }
                        placeholder={"Number of allowed answers"}
                        resetValue={handleChange}
                     />
                  </div>

                  <div>
                     <InputSetting
                        name="deadline"
                        label="Close poll on a scheduled date"
                        type="date"
                        value={formValues.deadline}
                        onChange={(e) =>
                           handleChange("deadline", e.target.value)
                        }
                        resetValue={handleChange}
                     />
                  </div>
               </div>
               <div className="flex justify-end mt-6">
                  <button
                     type="submit"
                     disabled={loading}
                     className="button primary-btn w-48"
                  >
                     {loading ? <AnimateSpin /> : "PUBLISH"}
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}

export default CreatePoll;
