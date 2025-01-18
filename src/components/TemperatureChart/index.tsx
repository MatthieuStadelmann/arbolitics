import ReactECharts from "echarts-for-react";
import { TemperatureChartProps } from "@/types/chart";
import { createChartOptions } from "@/config/chart";
import { useTemperatureChart } from "@/hooks/useTemperatureChart";
import { StatsOverlay } from "@/components/StatsOverlay";

export function TemperatureChart({
  data,
  timeRange,
  unit = "C",
}: TemperatureChartProps) {
  const { series, xAxisLabels, yAxisMin, yAxisMax } = useTemperatureChart({
    data,
    timeRange,
    unit
  });

  const options = createChartOptions(
    xAxisLabels,
    yAxisMin,
    yAxisMax,
    series,
    timeRange,
    unit
  );

  return (
    <div>
      <StatsOverlay 
        data={series.flatMap(s => s.data)}
        unit={unit}
        label="Temperature"
      />
      <ReactECharts
        key={JSON.stringify(series)}
        option={options}
        style={{ height: "400px" }}
      />
    </div>
  );
} 