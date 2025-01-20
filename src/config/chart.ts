import { ChartSeries, TooltipParams } from "@/types/chart";
import { getXAxisLabels } from "@/utils/chart";
import { TEMPERATURE_CHART_CONSTANTS } from "@/constants/chart";

export const createChartOptions = (
  xAxisLabels: string[],
  yAxisMin: number,
  yAxisMax: number,
  series: ChartSeries[],
  timeRange: string
) => ({
  title: {
    text: TEMPERATURE_CHART_CONSTANTS.LAYOUT.TITLE.TEXT,
    left: TEMPERATURE_CHART_CONSTANTS.LAYOUT.TITLE.POSITION,
    top: TEMPERATURE_CHART_CONSTANTS.LAYOUT.TITLE.TOP,
    textStyle: {
      fontWeight: TEMPERATURE_CHART_CONSTANTS.LAYOUT.TITLE.FONT_WEIGHT,
      fontSize: TEMPERATURE_CHART_CONSTANTS.LAYOUT.TITLE.FONT_SIZE,
    },
  },
  legend: {
    show: true,
    top: TEMPERATURE_CHART_CONSTANTS.LAYOUT.LEGEND.TOP,
    right: TEMPERATURE_CHART_CONSTANTS.LAYOUT.LEGEND.RIGHT,
    textStyle: {
      fontSize: TEMPERATURE_CHART_CONSTANTS.LAYOUT.LEGEND.FONT_SIZE,
    },
    itemWidth: TEMPERATURE_CHART_CONSTANTS.LAYOUT.LEGEND.ITEM_WIDTH,
    itemHeight: TEMPERATURE_CHART_CONSTANTS.LAYOUT.LEGEND.ITEM_HEIGHT,
  },
  tooltip: {
    trigger: TEMPERATURE_CHART_CONSTANTS.TOOLTIP.TRIGGER,
    backgroundColor: TEMPERATURE_CHART_CONSTANTS.COLORS.TOOLTIP_BG,
    borderWidth: TEMPERATURE_CHART_CONSTANTS.TOOLTIP.BORDER_WIDTH,
    shadowColor: TEMPERATURE_CHART_CONSTANTS.COLORS.TOOLTIP_SHADOW,
    shadowBlur: TEMPERATURE_CHART_CONSTANTS.TOOLTIP.SHADOW_BLUR,
    textStyle: {
      color: TEMPERATURE_CHART_CONSTANTS.COLORS.TOOLTIP_TEXT,
    },
    formatter: (params: TooltipParams[]) => {
      let tooltipText = `${params[0].axisValue}<br/>`;
      params.forEach((param) => {
        tooltipText += `
          <span style="display:inline-block;width:${
            TEMPERATURE_CHART_CONSTANTS.TOOLTIP.DOT_SIZE
          }px;height:${
          TEMPERATURE_CHART_CONSTANTS.TOOLTIP.DOT_SIZE
        }px;border-radius:50%;background-color:${param.color};margin-right:${
          TEMPERATURE_CHART_CONSTANTS.TOOLTIP.DOT_MARGIN_RIGHT
        }px;"></span>
          ${param.seriesName}: <strong>${Number(param.value).toFixed(
          1
        )}°C</strong><br/>`;
      });
      return tooltipText;
    },
  },
  xAxis: {
    type: TEMPERATURE_CHART_CONSTANTS.XAXIS.TYPE,
    data: getXAxisLabels(timeRange, xAxisLabels),
    boundaryGap: false,
    axisLabel: {
      rotate: window.innerWidth < 600 ? 45 : xAxisLabels.length > 12 ? 45 : 0,
      interval: TEMPERATURE_CHART_CONSTANTS.XAXIS.XAXIS_LABEL.INTERVAL,
      color: TEMPERATURE_CHART_CONSTANTS.COLORS.TEXT,
      alignWithLabel:
        TEMPERATURE_CHART_CONSTANTS.XAXIS.XAXIS_LABEL.ALIGN_WITH_LABEL,
    },
    axisTick: {
      alignWithLabel:
        TEMPERATURE_CHART_CONSTANTS.XAXIS.XAXIS_TICK.ALIGN_WITH_LABEL,
      interval: TEMPERATURE_CHART_CONSTANTS.XAXIS.XAXIS_TICK.INTERVAL,
    },
    axisLine: {
      lineStyle: { color: TEMPERATURE_CHART_CONSTANTS.COLORS.AXIS },
    },
  },
  yAxis: {
    type: TEMPERATURE_CHART_CONSTANTS.YAXIS.TYPE,
    min: yAxisMin,
    max: yAxisMax,
    splitNumber: TEMPERATURE_CHART_CONSTANTS.YAXIS.SPLIT_NUMBER,
    axisLabel: {
      formatter: (value: number) => `${value.toFixed(1)}°`,
      color: TEMPERATURE_CHART_CONSTANTS.COLORS.TEXT,
    },
    splitLine: {
      show: TEMPERATURE_CHART_CONSTANTS.YAXIS.YAXIS_SPLIT_LINE.SHOW,
      lineStyle: {
        color:
          TEMPERATURE_CHART_CONSTANTS.YAXIS.YAXIS_SPLIT_LINE.LINE_STYLE.COLOR,
        type: TEMPERATURE_CHART_CONSTANTS.YAXIS.YAXIS_SPLIT_LINE.LINE_STYLE
          .TYPE,
      },
    },
  },
  series,
  grid: TEMPERATURE_CHART_CONSTANTS.LAYOUT.GRID,
});
