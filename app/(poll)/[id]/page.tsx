"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { CREATE_VOTE, GET_POLL, GET_RESULT } from "@/lib/gql-calls";

import {
   ArrowSmallRightIcon,
   ChartPieIcon,
   EyeIcon,
   ShareIcon,
} from "@heroicons/react/24/outline";

import AnimateSpin from "@/components/Loaders/AnimateSpin";
import Checkbox from "@/components/Forms/Checkbox";
import CopyText from "@/components/Forms/CopyText";
import VoteCardSkeleton from "@/components/Skeletons/VoteCardSkeleton";

dayjs.extend(relativeTime);

function PollPage({ params }: { params: { id: string } }) {
   const router = useRouter();

   const [selectedAnswerIds, setSelectedAnswerIds] = useState<string[]>([]);

   const {
      loading: pollLoading,
      error,
      data,
   } = useQuery(GET_POLL, {
      variables: { pollId: params.id },
   });

   const [createVotes, { loading: voteLoading }] = useMutation(CREATE_VOTE, {
      errorPolicy: "all",
      refetchQueries: [
         {
            query: GET_RESULT,
            variables: { pollId: params.id },
         },
      ],
   });

   const handleCheckboxChange = (
      event: React.ChangeEvent<HTMLInputElement>
   ): void => {
      const { name, checked, value } = event.target;

      let newState;

      if (checked) {
         if (
            data.poll.allowedVotes !== "unlimit" &&
            selectedAnswerIds.length == Number(data.poll.allowedVotes)
         ) {
            toast.error(
               `maximum of ${data.poll.allowedVotes} vote(s) allowed`,
               {
                  style: {
                     fontSize: "14px",
                  },
               }
            );
            return;
         }
         newState = [...selectedAnswerIds, name];
      } else {
         newState = selectedAnswerIds.filter((item) => item !== name);
      }

      setSelectedAnswerIds(newState);
   };

   const handleVote = async () => {
      if (!selectedAnswerIds.length) {
         toast.error("Please select an option", {
            style: {
               fontSize: "14px",
            },
         });
         return;
      }

      try {
         const { data, errors } = await createVotes({
            variables: {
               optionIds: selectedAnswerIds,
            },
         });

         if (errors?.length) {
            toast.error(errors[0].message, {
               style: {
                  fontSize: "14px",
               },
            });
            return;
         }

         if (data) {
            router.push(`/${params.id}/results`);
         }
      } catch (error) {}
   };

   if (pollLoading) {
      return <VoteCardSkeleton />;
   }

   if (dayjs().isAfter(dayjs(data?.poll.deadline))) {
      return (
         <div className="mb-10 flex flex-col items-center">
            <div className="w-full max-w-3xl box mt-12 text-center">
               <h2 className="text-xl">This poll has expired</h2>
            </div>
         </div>
      );
   }

   return (
      <div className="mb-10 flex flex-col items-center">
         <div className="w-full max-w-3xl box mt-8">
            <h1 className="strawpoll-title text-2xl text-gray-900 dark:text-gray-200 font-medium break-words">
               {data?.poll.text}
            </h1>
            <div className="mt-2 text-sm text-gray-500">
               {`${
                  data?.poll.user ? `${data?.poll.user?.name} ` : "by a guest "
               } · ${dayjs(data?.poll.createdAt).fromNow()}`}
            </div>
            <div className="text-gray-500 mt-6">Make a choice :</div>
            <div className="mt-4">
               {data?.poll.options.map((option: any) => (
                  <div className="mt-4" key={option.id}>
                     <Checkbox
                        checked={selectedAnswerIds.includes(option.id)}
                        name={option.id.toString()}
                        label={option.answer}
                        onchange={(e) => handleCheckboxChange(e)}
                     />
                  </div>
               ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-x-4 lg:gap-x-6 mt-10">
               <button
                  type="button"
                  className="button py-2.5 primary-btn flex gap-x-2 w-full sm:w-32"
                  onClick={handleVote}
                  disabled={voteLoading}
               >
                  {voteLoading ? (
                     <AnimateSpin />
                  ) : (
                     <>
                        <span>Vote</span>
                        <ArrowSmallRightIcon className="w-5 h-4 stroke-[3]" />
                     </>
                  )}
               </button>
               <button
                  type="button"
                  className="button py-2.5 secondary-btn flex gap-x-2 w-full sm:w-40 mt-5 sm:mt-0"
                  onClick={() => router.push(`/${params.id}/results`)}
               >
                  <ChartPieIcon className="h-5 w-5 stroke-2" />
                  <span> Show results</span>
               </button>
            </div>
         </div>
         <div className="w-full max-w-3xl box p-0 mt-8">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
               <h2 className="text-lg text-gray-900 dark:text-gray-200 font-medium flex items-center gap-x-2.5">
                  <ShareIcon className="h-5 w-5 text-gray-400  stroke-2" />
                  <span>Share</span>
               </h2>
               <div className="text-xs text-gray-500 bg-gray-100 dark:text-gray-400 dark:bg-gray-800 px-2 py-1 rounded-md inline-flex items-center gap-x-2 border dark:border-gray-500">
                  <EyeIcon className="h-5 w-5 text-gray-400 stroke-2" />
                  <span> Only visible to you</span>
               </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700">
               <div className="px-4 py-6 sm:px-6 max-w-lg mx-auto">
                  <h6 className="text-sm">Share the link</h6>
                  <CopyText value="https://example.com/Qrgebk6kRZp" />
               </div>
            </div>
         </div>
      </div>
   );
}

export default PollPage;
