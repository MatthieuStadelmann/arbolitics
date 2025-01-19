import ReactECharts from "echarts-for-react";
import { TemperatureChartProps } from "@/types/chart";
import { createChartOptions } from "@/config/chart";
import { useTemperatureChart } from "@/hooks/useTemperatureChart";
import { StatsOverlay } from "@/components/StatsOverlay";

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
  );

  return (
    <div>
      <StatsOverlay
        data={series.flatMap((s) => s.data)}
        label="Temperature"
      />
      <ReactECharts
        key={JSON.stringify(series)}
        option={options}
        style={{ height: "600px" }}
      />
    </div>
  );
}

