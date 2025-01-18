import { ArboDataPoint } from "./arbo";
import { TimeRange } from "@/constants/arbo";

export type Unit = "C" | "F";

export interface TemperatureChartProps {
  data: ArboDataPoint[];
  timeRange: TimeRange;
  unit?: Unit;
}

export interface TooltipParams {
  dataIndex: number;
  seriesName: string;
  value: number;
}

export interface ChartSeries {
  name: string;
  type: "line";
  data: number[];
  color: string;
  smooth: boolean;
  symbol: string;
  symbolSize: number;
  lineStyle: {
    width: number;
    type: string;
  };
}

export interface UseTemperatureChartProps {
  data: ArboDataPoint[];
  timeRange: TimeRange;
  unit: Unit;
}

export interface ChartData {
  series: ChartSeries[];
  xAxisLabels: string[];
  yAxisMin: number;
  yAxisMax: number;
} 