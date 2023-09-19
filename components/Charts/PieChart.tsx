import React, { useState } from "react";

import { PieChart as Chart } from "react-minimal-pie-chart";

interface Props {}

const PieChart: React.FC = (props: Props) => {
   const [selected, setSelected] = useState<number | undefined>(0);

   const lineWidth = 60;
   return (
      <Chart
         data={[
            { title: "One", value: 10, color: "#2D3748" },
            { title: "Two", value: 15, color: "#2D3748" },
            { title: "Three", value: 20, color: "#2D3748" },
         ]}
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
