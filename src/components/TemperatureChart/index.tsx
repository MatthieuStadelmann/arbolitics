import ReactECharts from "echarts-for-react";
import { useTemperatureChart } from "@/hooks/useTemperatureChart";
import { TemperatureChartProps } from "@/types/temperatureChart";
import { createTemperatureChartOptions } from "@/config/temperatueChartConfig";

export function TemperatureChart({ data, timeRange }: TemperatureChartProps) {
  const { series, xAxisLabels, yAxisMin, yAxisMax } = useTemperatureChart({
    data,
    timeRange,
  });

  const options = createTemperatureChartOptions(
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
        style={{ height: "400px" }}
      />
    </div>
  );
}
