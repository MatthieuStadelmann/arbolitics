import { ArboDataPoint } from "./arbo";

export interface UseHumidityChartProps {
  data: ArboDataPoint[];
  selectedDevices: string[];
  timeRange: string;
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
