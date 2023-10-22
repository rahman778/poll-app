import React, { useState, useMemo } from "react";

import { PieChart as Chart } from "react-minimal-pie-chart";

const colorCodes = [
   "#059669",
   "#ca8a04",
   "#0284c7",
   "#c026d3",
   "#c026d3",
   "#e11d48",
   "#0000ff",
   "#ffff00",
];

type IPollData = {
   id: string;
   answer: string;
   votes: {
      id: string;
   }[];
};

const PieChart: React.FC<{ pollData: IPollData[] }> = ({ pollData }) => {
   const [selected, setSelected] = useState<number | undefined>(0);

   const formattedData = useMemo(() => {
      return pollData?.map((option, idx) => ({
         title: option.votes.length > 0 ? option.answer : "",
         value: option.votes.length,
         color: colorCodes[idx],
      }));
   }, [pollData]);

   const lineWidth = 60;

   const totalVotes = pollData?.reduce((accumulator, option) => {
      return accumulator + option.votes.length;
   }, 0);

   if (totalVotes === 0) {
      return (
         <>
            <div className="rounded-full bg-slate-300 dark:bg-slate-700 h-52 w-52"></div>
            <p className="text-xs text-center mt-2 mb-0 text-slate-400 dark:text-slate-700">
               A pie chart will be rendered here
            </p>
         </>
      );
   }

   return (
      <Chart
         data={formattedData}
         style={{
            fontSize: "5px",
         }}
         animate
         radius={50 - 6}
         lineWidth={60}
         segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
         segmentsShift={(index) => (index === selected ? 6 : 1)}
         label={({ dataEntry }) => dataEntry.title}
         labelPosition={100 - lineWidth / 2}
         labelStyle={{
            fill: "#fff",
            opacity: 0.75,
            pointerEvents: "none",
         }}
         onClick={(_, index) => {
            setSelected(index === selected ? undefined : index);
         }}
      />
   );
};

export default PieChart;
