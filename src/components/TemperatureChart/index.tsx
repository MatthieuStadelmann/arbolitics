import ReactECharts from "echarts-for-react";
import { TemperatureChartProps } from "@/types/chart";
import { createChartOptions } from "@/config/chart";
import { useTemperatureChart } from "@/hooks/useTemperatureChart";

export function TemperatureChart({
  data,
  timeRange,
}: TemperatureChartProps) {
  const { series, xAxisLabels, yAxisMin, yAxisMax } = useTemperatureChart({
    data,
    timeRange,
  });


  const options = createChartOptions(
    xAxisLabels,
    yAxisMin,
    yAxisMax,
    series,
    timeRange
  );


  return (
    <div>
      <ReactECharts
        key={JSON.stringify(series)}
        option={options}
        style={{ height: "600px" }}
      />
    </div>
  );
}

