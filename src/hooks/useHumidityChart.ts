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

    // 1. Correctly use API timestamps (TMS)
    const timestamps = [...new Set(data.map(d => d.TMS * 1000))].sort((a, b) => a - b); // Convert to ms

    // 2. Format labels correctly
    const formatDate = (ts: number, format: Intl.DateTimeFormatOptions) =>
      new Intl.DateTimeFormat('en-US', format).format(new Date(ts));

    // 3. Generate X-Axis Labels Based on Time Range
    const getAggregatedLabels = () => {
      if (timeRange === TIME_RANGES.DAILY) {
        return timestamps.map(ts => formatDate(ts, { hour: "2-digit", minute: "2-digit" }));
      } else if (timeRange === TIME_RANGES.WEEKLY) {
        return [...new Set(timestamps.map(ts => formatDate(ts, { month: 'short', day: 'numeric' })))];
      } else {
        return [...new Set(timestamps.map(ts => {
          const date = new Date(ts);
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - date.getDay());
          return `Week of ${formatDate(weekStart.getTime(), { month: 'short', day: 'numeric' })}`;
        }))];
      }
    };

    const xAxisLabels = getAggregatedLabels();
    const series: ChartData["series"] = [];

    const processDeviceData = (deviceId: string, color: string, deviceLabel: string) => {
      const filteredData = data.filter(d => d.DID === deviceId).sort((a, b) => a.TMS - b.TMS);
      
      const aggregatedData = aggregateData(filteredData, timeRange).map(d =>
        Number(((d.hum1 + 100) / 2).toFixed(1))
      );

      if (aggregatedData.length > 0) {
        series.push({
          name: deviceLabel,
          type: 'bar',
          data: aggregatedData,
          color
        });
      }
    };

    if (validSelectedDevices.length === 0 || validSelectedDevices.includes(DEVICE_IDS.DEVICE_1)) {
      processDeviceData(DEVICE_IDS.DEVICE_1, '#1890ff', "Device 25_225");
    }

    if (validSelectedDevices.length === 0 || validSelectedDevices.includes(DEVICE_IDS.DEVICE_2)) {
      processDeviceData(DEVICE_IDS.DEVICE_2, '#ff4500', "Device 25_226");
    }

    // 5. Compute Y-axis Range (Ensure Min is 0)
    const allHumidity = series.flatMap(s => s.data).filter(Boolean);
    const humidityMin = 0;
    const humidityMax = Math.max(100, ...allHumidity);
    
    return {
      series,
      xAxisLabels,
      yAxisMin: humidityMin,
      yAxisMax: humidityMax
    };
  }, [data, selectedDevices, timeRange]);
}
