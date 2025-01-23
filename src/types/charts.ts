export interface TooltipParams {
  dataIndex: number;
  seriesName: string;
  value: number;
  color: string;
  axisValue: string;
}

export interface ChartSeries {
  name: string;
  type: "line" | "bar";
  data: number[];
  color: string;
  smooth?: boolean;
  symbol?: string;
  symbolSize?: number;
  lineStyle?: {
    width: number;
    type: string;
  };
}



export interface ChartData {
  series: ChartSeries[];
  xAxisLabels: string[];
  yAxisMin: number;
  yAxisMax: number;
} 