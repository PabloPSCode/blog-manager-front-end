import GreetUser from "@/components/miscellaneous/GreetUser";
import { Title } from "@/components/typography/Title";
import { dashboardMetrics } from "@/data/mocked";
import Feather from "feather-icons-react";
import MetricsCard from "./components/MetricsCard";

export function Home() {
  return (
    <main className="w-full flex flex-1  flex-col p-4">
      <div className=" w-full flex flex-col md:ml-4 ">
        <div className="flex flex-col justify-between mb-6 mx-auto md:mx-[120px] w-[80%]">
          <GreetUser userName="John Doe" />
          <div className="flex w-full">
            <Feather
              icon="bar-chart-2"
              className="w-10 h-10 mr-2 text-black dark:text-white"
            />
            <Title
              content="Visão geral da sua plataforma"
              className="m-2 text-black dark:text-white text-lg md:text-xl font-bold font-secondary"
            />
          </div>
        </div>
        <div className="flex flex-row  w-full justify-center flex-wrap">
          {dashboardMetrics.map((metric) => (
            <MetricsCard
              key={metric.title}
              title={metric.title}
              iconName={metric.iconName}
              metric={metric.metric}
              link={metric.link}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
