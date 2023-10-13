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
   "#800080",
   "#ffa500",
];

interface IPollData {
   id: string;
   answer: string;
   votes: {
      id: string;
   }[];
}

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
