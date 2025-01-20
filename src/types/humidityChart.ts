import { ArboDataPoint, TimeRange } from "./arbo";

export interface HumidityChartProps {
  data: ArboDataPoint[];
  selectedDevices: string[];
  timeRange: TimeRange;
}
export interface UseHumidityChartProps {
  data: ArboDataPoint[];
  selectedDevices: string[];
  timeRange: TimeRange;
}

export interface HumidityChartData {
  series: {
    name: string;
    type: "bar";
    data: number[];
    color: string;
  }[];
  xAxisLabels: string[];
  yAxisMin: number;
  yAxisMax: number;
}
