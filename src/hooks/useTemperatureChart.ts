import { useMemo } from 'react';
import { DEVICE_IDS } from "@/constants/arbo";
import { ChartSeries, UseTemperatureChartProps, ChartData } from "@/types/chart";
import { aggregateData, formatDate } from "@/utils/chart";

export function useTemperatureChart({ data, timeRange }: UseTemperatureChartProps): ChartData {

  return useMemo(() => {
    const device225 = aggregateData(
      data.filter((d) => d.DID === DEVICE_IDS.DEVICE_1)
        .sort((a, b) => a.TMS - b.TMS),
      timeRange
    );
      
    const device226 = aggregateData(
      data.filter((d) => d.DID === DEVICE_IDS.DEVICE_2)
        .sort((a, b) => a.TMS - b.TMS),
      timeRange
    );

    const activeDevice = device225.length > 0 ? device225 : device226;
    const xAxisLabels = activeDevice.map((d) => formatDate(d.TMS, timeRange));

    const allTemps = [...device225, ...device226].map((d) => d.tem1);
    const tempMin = Math.min(...allTemps);
    const tempMax = Math.max(...allTemps);
    const buffer = Math.max(2, (tempMax - tempMin) * 0.2);
    const yAxisMin = Math.floor(tempMin - buffer);
    const yAxisMax = Math.ceil(tempMax + buffer);
    

    const series: ChartSeries[] = [
      device225.length > 0 && {
        name: "Device 25_225",
        type: "line",  
        data: device225.map((d) => d.tem1),
        color: "#1890ff",
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          width: 2,
          type: 'solid'
        }
      },
      device226.length > 0 && {
        name: "Device 25_226",
        type: "line",
        data: device226.map((d) => d.tem1),
        color: "#ff4500",
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          width: 2,
          type: 'solid'
        }
      }
    ].filter((series): series is ChartSeries => Boolean(series));

    return {
      series,
      xAxisLabels,
      yAxisMin,
      yAxisMax
    };
  }, [data, timeRange]);
} 