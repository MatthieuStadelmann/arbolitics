import { ChartSeries, TooltipParams, Unit } from "@/types/chart";
import { TIME_RANGES } from "@/constants/arbo";

export const createSeries = (
  data: number[],
  name: string,
  color: string
): ChartSeries => ({
  name,
  type: "line",
  data,
  color,
  smooth: true,
  symbol: 'circle',
  symbolSize: 6,
  lineStyle: {
    width: 2,
    type: 'solid'
  }
});

export const createChartOptions = (
  xAxisLabels: string[],
  yAxisMin: number,
  yAxisMax: number,
  series: ChartSeries[],
  timeRange: string,
  unit: Unit
) => ({
  title: {
    text: `Temperature Trends (°${unit})`,
    left: "center",
    textStyle: {
      fontWeight: 'normal',
      fontSize: 16
    }
  },
  legend: {
    show: true,
    top: "5%",
    right: "10%",
    textStyle: { fontSize: 12 },
    itemWidth: 15,
    itemHeight: 3
  },
  tooltip: {
    trigger: "axis",
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 0,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowBlur: 10,
    textStyle: {
      color: '#333'
    },
    formatter: (params: TooltipParams[]) => {
      return params.map((param) => 
        `${param.seriesName}: ${param.value.toFixed(1)}°${unit}`
      ).join('<br/>');
    }
  },
  xAxis: {
    type: "category",
    data: xAxisLabels,
    axisLabel: {
      rotate: timeRange !== TIME_RANGES.DAILY ? 45 : 0,
      interval: Math.floor(xAxisLabels.length / 6),
      color: '#666'
    },
    axisLine: {
      lineStyle: { color: '#ddd' }
    }
  },
  yAxis: {
    type: "value",
    min: yAxisMin,
    max: yAxisMax,
    splitNumber: 8,
    axisLabel: { 
      formatter: (value: number) => `${value.toFixed(1)}°`,
      color: '#666'
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#eee',
        type: 'dashed'
      }
    }
  },
  series,
  grid: { 
    left: "10%", 
    right: "5%", 
    bottom: "15%",
    top: "15%",
    height: "75%"
  }
}); 