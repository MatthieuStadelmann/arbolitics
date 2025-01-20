import { useMemo } from "react";
import { DEVICE_IDS } from "@/constants/arbo";
import {
  HumidityChartData,
  UseHumidityChartProps,
} from "@/types/humidityChart";
import { aggregateData } from "@/utils/charts";

export function useHumidityChart({
  data,
  selectedDevices,
  timeRange,
}: UseHumidityChartProps): HumidityChartData {
  return useMemo(() => {
    const validSelectedDevices = selectedDevices.filter((d) => d !== "");

    const timestamps = [...new Set(data.map((d) => d.TMS * 1000))].sort(
      (a, b) => a - b
    );

    const formatDate = (ts: number, format: Intl.DateTimeFormatOptions) =>
      new Intl.DateTimeFormat("en-US", format).format(new Date(ts));

    const getAggregatedLabels = () => {
      switch (timeRange) {
        case "DAILY":
          return timestamps.map((ts) =>
            formatDate(ts, { hour: "2-digit", minute: "2-digit" })
          );
        case "WEEKLY":
          return [
            ...new Set(
              timestamps.map((ts) =>
                formatDate(ts, { month: "short", day: "numeric" })
              )
            ),
          ];
        case "MONTHLY":
          return [
            ...new Set(
              timestamps.map((ts) => {
                const date = new Date(ts);
                const weekStart = new Date(date);
                weekStart.setDate(date.getDate() - date.getDay());
                return `Week of ${formatDate(weekStart.getTime(), {
                  month: "short",
                  day: "numeric",
                })}`;
              })
            ),
          ];
        default:
          return [];
      }
    };

    const xAxisLabels = getAggregatedLabels();
    const series: HumidityChartData["series"] = [];

    const processDeviceData = (
      deviceId: string,
      color: string,
      deviceLabel: string
    ) => {
      const filteredData = data
        .filter((d) => d.DID === deviceId)
        .sort((a, b) => a.TMS - b.TMS);

      const aggregatedData = aggregateData(filteredData, timeRange).map((d) =>
        Number(((d.hum1 + 100) / 2).toFixed(1))
      );

      if (aggregatedData.length > 0) {
        series.push({
          name: deviceLabel,
          type: "bar",
          data: aggregatedData,
          color,
        });
      }
    };

    if (
      validSelectedDevices.length === 0 ||
      validSelectedDevices.includes(DEVICE_IDS.DEVICE_1)
    ) {
      processDeviceData(DEVICE_IDS.DEVICE_1, "#1890ff", "Device 25_225");
    }

    if (
      validSelectedDevices.length === 0 ||
      validSelectedDevices.includes(DEVICE_IDS.DEVICE_2)
    ) {
      processDeviceData(DEVICE_IDS.DEVICE_2, "#ff4500", "Device 25_226");
    }

    const allHumidity = series.flatMap((s) => s.data).filter(Boolean);
    const humidityMin = 0;
    const humidityMax = Math.max(100, ...allHumidity);

    return {
      series,
      xAxisLabels,
      yAxisMin: humidityMin,
      yAxisMax: humidityMax,
    };
  }, [data, selectedDevices, timeRange]);
}
