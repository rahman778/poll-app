"use client";

import React, { useState } from "react";
import { useRouter, notFound } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { CREATE_VOTE, GET_POLL, GET_RESULT } from "@/lib/gql-calls";

import { ArrowSmallRightIcon, ChartPieIcon } from "@heroicons/react/24/outline";

import AnimateSpin from "@/components/Loaders/AnimateSpin";
import { Checkbox } from "@/components/Forms";
import ShareCard from "@/components/Cards/ShareCard";
import { VoteCardSkeleton, ShareCardSkeleton } from "@/components/Skeletons";

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
            toast.error(`maximum of ${data.poll.allowedVotes} vote(s) allowed`);
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
         toast.error("Please select an option");
         return;
      }

      try {
         const { data: voteRes, errors } = await createVotes({
            variables: {
               optionIds: selectedAnswerIds,
               pollId: data.poll.id,
            },
         });

         if (errors?.length) {
            toast.error(errors[0].message);
            return;
         }

         if (voteRes) {
            router.push(`/${params.id}/results`);
         }
      } catch (error) {}
   };

   if (pollLoading) {
      return (
         <>
            <VoteCardSkeleton /> <ShareCardSkeleton />
         </>
      );
   }

   if (error || data.poll === null) {
      notFound();
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
            <h1 className="text-2xl text-gray-900 dark:text-gray-200 font-medium break-words">
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
            <ShareCard
               value={`${process.env.NEXT_PUBLIC_BASE_URL}/${params.id}`}
            />
         </div>
      </div>
   );
}

export default PollPage;
