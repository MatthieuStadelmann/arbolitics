import { useMemo } from 'react';
import { DEVICE_IDS } from "@/constants/arbo";
import { ChartSeries, UseTemperatureChartProps, ChartData } from "@/types/chart";
import { aggregateData, calculateAxisBounds, formatDate, processDeviceData } from "@/utils/chart";
import { TEMPERATURE_CHART_CONSTANTS } from '@/constants/chart';


export function useTemperatureChart({ data, timeRange }: UseTemperatureChartProps): ChartData {
  return useMemo(() => {
    if (!data?.length) {
      return {
        series: [],
        xAxisLabels: [],
        yAxisMin: 0,
        yAxisMax: 1
      };
    }

    const device225Data = aggregateData(
      data.filter((d) => d.DID === DEVICE_IDS.DEVICE_1)
        .sort((a, b) => a.TMS - b.TMS),
      timeRange
    );
      
    const device226Data = aggregateData(
      data.filter((d) => d.DID === DEVICE_IDS.DEVICE_2)
        .sort((a, b) => a.TMS - b.TMS),
      timeRange
    );

    const activeDevices = [...device225Data, ...device226Data];
    const xAxisLabels = [...new Set(activeDevices.map((d) => formatDate(d.TMS, timeRange)))];

    const series: ChartSeries[] = [
      processDeviceData(device225Data, {
        name: TEMPERATURE_CHART_CONSTANTS.DEVICE_NAMES.DEVICE_225,
        color: TEMPERATURE_CHART_CONSTANTS.COLORS.DEVICE_225
      }),
      processDeviceData(device226Data, {
        name: TEMPERATURE_CHART_CONSTANTS.DEVICE_NAMES.DEVICE_226,
        color: TEMPERATURE_CHART_CONSTANTS.COLORS.DEVICE_226
      })
    ].filter((s): s is ChartSeries => s !== null);

    const { min: yAxisMin, max: yAxisMax } = calculateAxisBounds(
      activeDevices.map(d => d.tem1)
    );

    return {
      series,
      xAxisLabels,
      yAxisMin,
      yAxisMax
    };
  }, [data, timeRange]);
} 