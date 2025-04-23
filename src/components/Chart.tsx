// "use client";

// import React from "react";

// import { BarChart, type BarChartEventProps } from "@/src/components/BarChart";

// interface ChartProps {
//   chartData: any[];
// }

// export const Chart = ({ chartData }: ChartProps) => {
//   const [value, setValue] = React.useState<BarChartEventProps>(null);

//   return (
//     <div className="p-10">
//       <BarChart
//         categories={["Number of students"]}
//         className="h-72"
//         colors={["lightBlue"]}
//         data={chartData}
//         index="name"
//         yAxisWidth={45}
//         onValueChange={(v) => setValue(v)}
//       />
//       {/* <pre className="mt-8 rounded-md bg-gray-950 p-3 text-sm text-white dark:bg-gray-800 ">
//         {JSON.stringify(value, null, 2)}
//       </pre> */}
//     </div>
//   );
// };
