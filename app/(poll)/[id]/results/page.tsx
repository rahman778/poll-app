"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { GET_RESULT } from "@/lib/gql-calls";

import AnimateSpin from "@/components/Loaders/AnimateSpin";
import CopyText from "@/components/Forms/CopyText";
import HorizontalBar from "@/components/Charts/HorizontalBar";
import PieChart from "@/components/Charts/PieChart";
import ResultCardSkeleton from "@/components/Skeletons/ResultCardSkeleton";

import {
   ArrowSmallLeftIcon,
   ArrowPathIcon,
   EyeIcon,
   ShareIcon,
} from "@heroicons/react/24/outline";

dayjs.extend(relativeTime);

import { NetworkStatus } from '@apollo/client';

function ResultsPage({ params }: { params: { id: string } }) {
   const router = useRouter();

   const {
      loading: pollLoading,
      error,
      data,
      refetch,
      networkStatus
   } = useQuery(GET_RESULT, {
      variables: { pollId: params.id },
      notifyOnNetworkStatusChange: true,
   });

   if (pollLoading && networkStatus === NetworkStatus.loading) {
      return <ResultCardSkeleton />;
   }

   return (
      <div className="mb-10 flex flex-col items-center">
         <div className="w-full max-w-3xl box mt-8">
            <h1 className="strawpoll-title text-2xl text-gray-900 dark:text-gray-200 font-medium break-words">
               {data?.poll.text}
            </h1>
            <div className="mt-2 text-sm text-gray-500">
               {`${
                  data?.poll?.user
                     ? `${data?.poll?.user?.name} `
                     : "by a guest "
               } · ${dayjs(data?.poll.createdAt).fromNow()}`}
            </div>
            <div className="md:flex items-center md:gap-x-6 space-y-8">
               <div className="flex-grow mt-4">
                  <HorizontalBar pollData={data?.poll.options} />
               </div>
               <div className="flex-shrink-0 relative">
                  <div className="max-w-[275px] mx-auto">
                     <PieChart pollData={data?.poll.options} />
                  </div>
               </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-x-4 lg:gap-x-6 mt-10">
               <button
                  type="button"
                  className="button py-2.5 primary-btn flex gap-x-2 w-full sm:w-48"
                  onClick={() => refetch({variables: { pollId: params.id }})}
                  disabled={pollLoading}
               >
                  {pollLoading ? (
                     <AnimateSpin />
                  ) : (
                     <>
                        <ArrowPathIcon className="w-5 h-4 stroke-[3]" />
                        <span>Refresh results</span>
                     </>
                  )}
               </button>
               <button
                  type="button"
                  className="button py-2.5 secondary-btn flex gap-x-2 w-full sm:w-40 mt-5 sm:mt-0"
                  onClick={() => router.back()}
               >
                  <ArrowSmallLeftIcon className="w-5 h-4 stroke-[3]" />
                  <span> Back to poll</span>
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

export default ResultsPage;
