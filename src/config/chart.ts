import { ChartSeries, TooltipParams } from "@/types/chart";

export const createChartOptions = (
  xAxisLabels: string[],
  yAxisMin: number,
  yAxisMax: number,
  series: ChartSeries[],
) => ({
  title: {
    text: `Temperature Trends`,
    left: "center",
    textStyle: {
      fontWeight: "normal",
      fontSize: 16,
    },
  },
  legend: {
    show: true,
    top: "5%",
    right: "10%",
    textStyle: { fontSize: 12 },
    itemWidth: 15,
    itemHeight: 3,
  },
  tooltip: {
    trigger: "axis",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderWidth: 0,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowBlur: 10,
    textStyle: {
      color: "#333",
    },
    formatter: (params: TooltipParams[]) => {
      const timeIndex = params[0]?.dataIndex ?? 0;
      const timeLabel = xAxisLabels[timeIndex] ?? "Unknown Time";

      return (
        `<b>Time: ${timeLabel}</b><br/>` +
        params
          .map((param) => `${param.seriesName}: ${param.value.toFixed(1)}°`)
          .join("<br/>")
      );
    },
  },
  xAxis: {
    type: "category",
    data: xAxisLabels,
    axisLabel: {
      rotate: window.innerWidth < 600 ? 45 : xAxisLabels.length > 12 ? 45 : 0,
      interval: 'auto',
      color: "#666",
      alignWithLabel: true,
    },
    axisTick: {
      alignWithLabel: true,
      interval: "auto",
    },
    axisLine: {
      lineStyle: { color: "#ddd" },
    },
  },
  yAxis: {
    type: "value",
    min: yAxisMin,
    max: yAxisMax,
    splitNumber: 8,
    axisLabel: {
      formatter: (value: number) => `${value.toFixed(1)}°`,
      color: "#666",
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "#eee",
        type: "dashed",
      },
    },
  },
  series,
  grid: {
    left: "10%",
    right: "5%",
    bottom: "15%",
    top: "15%",
    height: "75%",
  },
});
