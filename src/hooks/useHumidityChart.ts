import { useMemo } from 'react';
import { DEVICE_IDS, TIME_RANGES } from "@/constants/arbo";
import { ArboDataPoint } from "@/types/arbo";
import { aggregateData } from "@/utils/chart";

interface UseHumidityChartProps {
  data: ArboDataPoint[];
  selectedDevices: string[];
  timeRange: string;
}

interface ChartData {
  series: {
    name: string;
    type: 'bar';
    data: number[];
    color: string;
  }[];
  xAxisLabels: string[];
  yAxisMin: number;
  yAxisMax: number;
}

export function useHumidityChart({ data, selectedDevices, timeRange }: UseHumidityChartProps): ChartData {
  return useMemo(() => {
    const validSelectedDevices = selectedDevices.filter(d => d !== '');

    // Get aggregated timestamps based on timeRange
    const getAggregatedLabels = () => {
      const timestamps = [...new Set(data.map(d => d.TMS))].sort((a, b) => a - b);
      if (timeRange === TIME_RANGES.DAILY) {
        return timestamps.map(ts => 
          new Date(ts * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        );
      } else if (timeRange === TIME_RANGES.WEEKLY) {
        // Group by days
        return [...new Set(timestamps.map(ts => 
          new Date(ts * 1000).toLocaleDateString([], { month: 'short', day: 'numeric' })
        ))];
      } else {
        // Group by weeks
        return [...new Set(timestamps.map(ts => {
          const date = new Date(ts * 1000);
          const weekStart = new Date(date.setDate(date.getDate() - date.getDay()));
          return `Week of ${weekStart.toLocaleDateString([], { month: 'short', day: 'numeric' })}`;
        }))];
      }
    };

    const xAxisLabels = getAggregatedLabels();

    const series = [];
    
    if (validSelectedDevices.length === 0 || validSelectedDevices.includes(DEVICE_IDS.DEVICE_1)) {
      const device225Data = aggregateData(
        data.filter(d => d.DID === DEVICE_IDS.DEVICE_1)
          .sort((a, b) => a.TMS - b.TMS),
        timeRange
      ).map(d => Number((d.hum1 / 10).toFixed(1)));

      if (device225Data.length > 0) {
        series.push({
          name: "Device 25_225",
          type: 'bar' as const,
          data: device225Data,
          color: '#1890ff'
        });
      }
    }
    
    if (validSelectedDevices.length === 0 || validSelectedDevices.includes(DEVICE_IDS.DEVICE_2)) {
      const device226Data = aggregateData(
        data.filter(d => d.DID === DEVICE_IDS.DEVICE_2)
          .sort((a, b) => a.TMS - b.TMS),
        timeRange
      ).map(d => Number((d.hum1 / 10).toFixed(1)));

      if (device226Data.length > 0) {
        series.push({
          name: "Device 25_226",
          type: 'bar' as const,
          data: device226Data,
          color: '#ff4500'
        });
      }
    }

    const allHumidity = series.flatMap(s => s.data).filter(Boolean);
    const humidityMin = Math.min(...allHumidity);
    const humidityMax = Math.max(...allHumidity);
    const buffer = 5;

    return {
      series,
      xAxisLabels,
      yAxisMin: Math.floor(humidityMin - buffer),
      yAxisMax: Math.ceil(humidityMax + buffer)
    };
  }, [data, selectedDevices, timeRange]);
} 