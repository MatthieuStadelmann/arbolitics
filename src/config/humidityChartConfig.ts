import { TimeRange } from "@/types/arbo";
import { ChartSeries } from "@/types/charts";
import { getXAxisLabels } from "@/utils/temperatureChart";
import { HUMIDITY_CHART_CONSTANTS } from "@/constants/humidityChartConsts";
import { formatHumidityTooltip } from "@/utils/humidityChartTooltip";

export const createHumidityChartConfig = (
  xAxisLabels: string[],
  yAxisMin: number,
  yAxisMax: number,
  series: ChartSeries[],
  timeRange: TimeRange
) => ({
  title: {
    text: HUMIDITY_CHART_CONSTANTS.TITLE.TEXT,
    left: HUMIDITY_CHART_CONSTANTS.TITLE.POSITION,
    textStyle: {
      fontWeight: HUMIDITY_CHART_CONSTANTS.TOOLTIP.FONT_WEIGHT.NORMAL,
      fontSize: HUMIDITY_CHART_CONSTANTS.TITLE.FONT_SIZE,
    },
  },
  legend: {
    show: true,
    top: HUMIDITY_CHART_CONSTANTS.LEGEND.TOP_POSITION,
    right: HUMIDITY_CHART_CONSTANTS.LEGEND.RIGHT_POSITION,
    textStyle: { fontSize: HUMIDITY_CHART_CONSTANTS.LEGEND.FONT_SIZE },
    itemWidth: HUMIDITY_CHART_CONSTANTS.LEGEND.ITEM_WIDTH,
    itemHeight: HUMIDITY_CHART_CONSTANTS.LEGEND.ITEM_HEIGHT,
  },
  tooltip: {
    trigger: HUMIDITY_CHART_CONSTANTS.TOOLTIP.TRIGGER,
    backgroundColor: HUMIDITY_CHART_CONSTANTS.TOOLTIP.BACKGROUND_COLOR,
    borderWidth: 0,
    shadowColor: HUMIDITY_CHART_CONSTANTS.TOOLTIP.SHADOW_COLOR,
    shadowBlur: HUMIDITY_CHART_CONSTANTS.TOOLTIP.SHADOW_BLUR,
    textStyle: {
      color: HUMIDITY_CHART_CONSTANTS.TOOLTIP.TEXT_COLOR,
    },
    formatter: formatHumidityTooltip,
  },
  xAxis: {
    type: HUMIDITY_CHART_CONSTANTS.AXIS.TYPE.CATEGORY,
    data: getXAxisLabels(timeRange, xAxisLabels),
    axisLabel: {
      color: HUMIDITY_CHART_CONSTANTS.AXIS.TEXT_COLOR,
    },
    axisLine: {
      lineStyle: { color: HUMIDITY_CHART_CONSTANTS.AXIS.LINE_COLOR },
    },
  },
  yAxis: {
    type: HUMIDITY_CHART_CONSTANTS.AXIS.TYPE.VALUE,
    min: yAxisMin,
    max: yAxisMax,
    splitNumber: HUMIDITY_CHART_CONSTANTS.AXIS.SPLIT_NUMBER,
    axisLabel: {
      formatter: (value: number) => `${value.toFixed(1)}%`,
      color: HUMIDITY_CHART_CONSTANTS.AXIS.TEXT_COLOR,
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: HUMIDITY_CHART_CONSTANTS.AXIS.SPLIT_LINE_COLOR,
        type: HUMIDITY_CHART_CONSTANTS.AXIS.LINE_TYPE.DASHED,
      },
    },
  },
  grid: HUMIDITY_CHART_CONSTANTS.GRID,
  series,
});
