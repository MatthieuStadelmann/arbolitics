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