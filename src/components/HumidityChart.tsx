import ReactECharts from "echarts-for-react";
import { useHumidityChart } from "@/hooks/useHumidityChart";
import { HumidityChartProps } from "@/types/humidityChart";
import { createHumidityChartConfig } from "@/config/humidityChartConfig";

export function HumidityChart({
  data,
  selectedDevices,
  timeRange,
}: HumidityChartProps) {
  const { series, xAxisLabels, yAxisMin, yAxisMax } = useHumidityChart({
    data,
    selectedDevices,
    timeRange,
  });

  return (
    <div>
      <ReactECharts
        option={createHumidityChartConfig(
          xAxisLabels,
          yAxisMin,
          yAxisMax,
          series,
          timeRange
        )}
        style={{ height: "400px" }}
        key={JSON.stringify(series)}
      />
    </div>
  );
}
