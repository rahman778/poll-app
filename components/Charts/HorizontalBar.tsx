import React, { useEffect, useState } from "react";

type IPollData = {
   id: string;
   answer: string;
   votes: {
      id: string;
   }[];
};

const HorizontalBar: React.FC<{ pollData: IPollData[] }> = ({ pollData }) => {
   const [animationComplete, setAnimationComplete] = useState<boolean>(false);

   useEffect(() => {
      const animationTimeout = setTimeout(() => {
         setAnimationComplete(true);
      }, 300);

      // Clean up the timeout on component unmount
      return () => clearTimeout(animationTimeout);
   }, []);

   const totalVotes = pollData?.reduce((accumulator, option) => {
      return accumulator + option.votes.length;
   }, 0);

   return (
      <div>
         {pollData?.map((option) => {
            const percentage =
               totalVotes > 0
                  ? ((option.votes.length / totalVotes) * 100).toFixed(1)
                  : 0;

            return (
               <div className="mb-1" key={option.id}>
                  <div className="text-sm text-gray-500 font-medium mb-1">
                     {option.answer}
                  </div>
                  <div className="bg-slate-200 dark:bg-[#2D3748] h-4 relative rounded-xl">
                     <div
                        className={`bg-violet-600 h-full absolute top-0 left-0 rounded-xl ${
                           animationComplete ? "w-full" : ""
                        }`}
                        style={{
                           width: animationComplete
                              ? `${(option.votes.length / totalVotes) * 100}%`
                              : "0%",
                           transition: animationComplete
                              ? "width 1s ease-in-out"
                              : "none",
                        }}
                     ></div>
                  </div>
                  <div className="flex text-gray-500 text-sm justify-end items-center gap-x-2 mt-2">
                     <div>{percentage || "0"}%</div>
                     <div>({option.votes.length} votes)</div>
                  </div>
               </div>
            );
         })}
      </div>
   );
};

export default HorizontalBar;
