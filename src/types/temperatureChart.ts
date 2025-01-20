import { ArboDataPoint } from "./arbo";
import { TimeRange } from "@/constants/arbo";

export interface TemperatureChartProps {
  data: ArboDataPoint[];
  timeRange: TimeRange;
}

export interface UseTemperatureChartProps {
    data: ArboDataPoint[];
    timeRange: TimeRange;
  }