import { ArboDataPoint, TimeRange } from "./arbo";

export interface TemperatureChartProps {
  data: ArboDataPoint[];
  timeRange: TimeRange;
}

export interface UseTemperatureChartProps {
  data: ArboDataPoint[];
  timeRange: TimeRange;
}
