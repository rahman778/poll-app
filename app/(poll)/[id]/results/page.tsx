"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { GET_RESULT } from "@/lib/gql-calls";

import AnimateSpin from "@/components/Loaders/AnimateSpin";
import HorizontalBar from "@/components/Charts/HorizontalBar";
import PieChart from "@/components/Charts/PieChart";
import ShareCard from "@/components/Cards/ShareCard";
import ResultCardSkeleton from "@/components/Skeletons/ResultCardSkeleton";
import ShareCardSkeleton from "@/components/Skeletons/ShareCardSkeleton";

import { ArrowSmallLeftIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

dayjs.extend(relativeTime);

import { NetworkStatus } from "@apollo/client";

function ResultsPage({ params }: { params: { id: string } }) {
   const router = useRouter();

   const {
      loading: pollLoading,
      error,
      data,
      refetch,
      networkStatus,
   } = useQuery(GET_RESULT, {
      variables: { pollId: params.id },
      notifyOnNetworkStatusChange: true,
   });

   if (pollLoading && networkStatus === NetworkStatus.loading) {
      return (
         <>
            <ResultCardSkeleton />
            <ShareCardSkeleton />
         </>
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
                  onClick={() => refetch({ variables: { pollId: params.id } })}
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
            <ShareCard
               value={`${process.env.NEXT_PUBLIC_BASE_URL}/${params.id}`}
            />
         </div>
      </div>
   );
}

export default ResultsPage;
