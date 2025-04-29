import CircleChart from "@/src/components/CircleChart";
import KpiStat from "@/src/components/KpiStat";
import { subtitle } from "@/src/components/primitives";

export default function Home() {
  return (
    <div>
      <div className={subtitle({ class: "my-8 tracking-wider" })}>
        Performance Report
      </div>
      <section className="w-full h-[500px]">
        {/* <Chart chartData={quantityStudentsChartData} /> */}
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-10 xl:grid-cols-3">
          <KpiStat
            change={"33%"}
            changeType={"positive"}
            iconName={"solar:users-group-rounded-linear"}
            title={"Total Students"}
            trendChipPosition={"top"}
            value={"5,400"}
          />
        </div>

        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 my-5 lg:gap-10 lg:my-10 xl:grid-cols-3">
          <CircleChart
            categories={["Active", "Paused", "Vacation"]}
            chartData={[
              { name: "Active", value: 304 },
              { name: "Paused", value: 43 },
              { name: "Vacation", value: 57 },
            ]}
            color="danger"
            title="Status"
          />
          <CircleChart
            categories={["Female", "Male"]}
            chartData={[
              { name: "Female", value: 350 },
              { name: "Male", value: 480 },
            ]}
            color="primary"
            title="Browser Usage"
          />
        </div>
      </section>
    </div>
  );
}
