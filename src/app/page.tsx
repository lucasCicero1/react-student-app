import { Chart } from "../components/Chart";

import { subtitle } from "@/src/components/primitives";
import { quantityStudentsChartData } from "@/src/lib/data";

export default function Home() {
  return (
    <div>
      <div className={subtitle({ class: "my-8 tracking-wider" })}>
        Performance Report
      </div>
      <section className="w-full h-[500px] bg-white">
        <Chart chartData={quantityStudentsChartData} />
      </section>
    </div>
  );
}
