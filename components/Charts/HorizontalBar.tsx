import React, { useEffect, useState } from "react";

interface PollData {
   id: number;
   label: string;
   votes: number;
}

const PollResults: React.FC<{ pollData: PollData[] }> = ({ pollData }) => {
   const [animationComplete, setAnimationComplete] = useState<boolean>(false);

   useEffect(() => {
      const animationTimeout = setTimeout(() => {
         setAnimationComplete(true);
      }, 300);

      // Clean up the timeout on component unmount
      return () => clearTimeout(animationTimeout);
   }, []);

   const totalVotes: number = pollData.reduce(
      (total, option) => total + option.votes,
      0
   );

   return (
      <div>
         {pollData.map((option) => (
            <div className="mb-1" key={option.id}>
               <div className="text-sm text-gray-500 font-medium mb-1">
                  {option.label}
               </div>
               <div className="bg-slate-200 dark:bg-[#2D3748] h-4 relative rounded-xl">
                  <div
                     className={`bg-violet-600 h-full absolute top-0 left-0 rounded-xl ${
                        animationComplete ? "w-full" : ""
                     }`}
                     style={{
                        width: animationComplete
                           ? `${(option.votes / totalVotes) * 100}%`
                           : "0%",
                        transition: animationComplete
                           ? "width 1s ease-in-out"
                           : "none",
                     }}
                  ></div>
               </div>
               <div className="flex text-gray-500 text-sm justify-end items-center gap-x-2 mt-2">
                  <div>{((option.votes / totalVotes) * 100).toFixed(1)}%</div>
                  <div>({option.votes} votes)</div>
               </div>
            </div>
         ))}
      </div>
   );
};

export default PollResults;
