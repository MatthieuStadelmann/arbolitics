import { useMemo } from "react";
import { DEVICE_IDS } from "@/constants/arbo";
import {
  calculateAxisBounds,
  formatDate,
  processDeviceData,
} from "@/utils/temperatureChart";
import { TEMPERATURE_CHART_CONSTANTS } from "@/constants/temperateChartConsts";
import { ArboDataPoint } from "@/types/arbo";
import { UseTemperatureChartProps } from "@/types/temperatureChart";
import { ChartData, ChartSeries } from "@/types/charts";
import { aggregateData } from "@/utils/charts";

export function useTemperatureChart({
  data,
  timeRange,
}: UseTemperatureChartProps): ChartData {
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
        .filter((d: ArboDataPoint) => d.DID === DEVICE_IDS.DEVICE_1)
        .sort((a: ArboDataPoint, b: ArboDataPoint) => a.TMS - b.TMS),
      timeRange
    );
    const device226Data = aggregateData(
      data
        .filter((d: ArboDataPoint) => d.DID === DEVICE_IDS.DEVICE_2)
        .sort((a: ArboDataPoint, b: ArboDataPoint) => a.TMS - b.TMS),
      timeRange
    );

    const activeDevices = [...device225Data, ...device226Data];
    const xAxisLabels = [
      ...new Set(
        activeDevices.map((d: ArboDataPoint) => formatDate(d.TMS, timeRange))
      ),
    ];

    const series: ChartSeries[] = [
      processDeviceData(device225Data, {
        name: TEMPERATURE_CHART_CONSTANTS.DEVICE_NAMES.DEVICE_225,
        color: TEMPERATURE_CHART_CONSTANTS.COLORS.DEVICE_225,
      }),
      processDeviceData(device226Data, {
        name: TEMPERATURE_CHART_CONSTANTS.DEVICE_NAMES.DEVICE_226,
        color: TEMPERATURE_CHART_CONSTANTS.COLORS.DEVICE_226,
      }),
    ].filter((s: ChartSeries | null): s is ChartSeries => s !== null);

    const { min: yAxisMin, max: yAxisMax } = calculateAxisBounds(
      activeDevices.map((d: ArboDataPoint) => d.tem1)
    );
    return {
      series,
      xAxisLabels,
      yAxisMin,
      yAxisMax,
    };
  }, [data, timeRange]);
}
