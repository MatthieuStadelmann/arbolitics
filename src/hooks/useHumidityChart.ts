import { useMemo } from "react";
import { DEVICE_IDS } from "@/constants/arbo";
import { UseHumidityChartProps } from "@/types/humidityChart";
import { aggregateData } from "@/utils/charts";
import { ArboDataPoint } from "@/types/arbo";
import { formatDate } from "@/utils/temperatureChart";
import { TEMPERATURE_CHART_CONSTANTS } from "@/constants/temperateChartConsts";
import { ChartData, ChartSeries } from "@/types/charts";
import { processHumidityData } from "@/utils/humidityChart";

export function useHumidityChart({
  data,
  timeRange,
}: UseHumidityChartProps): ChartData {
  return useMemo(() => {
    if (!data?.length) {
      return {
        series: [],
        xAxisLabels: [],
        yAxisMin: 0,
        yAxisMax: 1,
      };
    }

    const device225Data = aggregateData(
      data
        .filter(
          (dataPoint: ArboDataPoint) => dataPoint.DID === DEVICE_IDS.DEVICE_1
        )
        .sort((a: ArboDataPoint, b: ArboDataPoint) => a.TMS - b.TMS),
      timeRange,
      "hum1"
    );
    const device226Data = aggregateData(
      data
        .filter(
          (dataPoint: ArboDataPoint) => dataPoint.DID === DEVICE_IDS.DEVICE_2
        )
        .sort((a: ArboDataPoint, b: ArboDataPoint) => a.TMS - b.TMS),
      timeRange,
      "hum1"
    );
    const activeDevices = [...device225Data, ...device226Data];

    const xAxisLabels = [
      ...new Set(
        activeDevices.map((dataPoint: ArboDataPoint) =>
          formatDate(dataPoint.TMS, timeRange)
        )
      ),
    ];

    const series: ChartSeries[] = [
      processHumidityData(device225Data, {
        name: TEMPERATURE_CHART_CONSTANTS.DEVICE_NAMES.DEVICE_225,
        color: TEMPERATURE_CHART_CONSTANTS.COLORS.DEVICE_225,
      }),
      processHumidityData(device226Data, {
        name: TEMPERATURE_CHART_CONSTANTS.DEVICE_NAMES.DEVICE_226,
        color: TEMPERATURE_CHART_CONSTANTS.COLORS.DEVICE_226,
      }),
    ].filter(
      (series: ChartSeries | null): series is ChartSeries => series !== null
    );

    const allHumidity = series.flatMap((s) => s.data).filter(Boolean);
    const humidityMin = 0;
    const humidityMax = Math.max(100, ...allHumidity);

    return {
      series,
      xAxisLabels,
      yAxisMin: humidityMin,
      yAxisMax: humidityMax,
    };
  }, [data, timeRange]);
}
