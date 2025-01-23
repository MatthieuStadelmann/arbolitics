import { TooltipParams } from "@/types/charts";
import { HUMIDITY_CHART_CONSTANTS } from "@/constants/humidityChartConsts";

export const formatHumidityTooltip = (params: TooltipParams[]): string => {
  let tooltipText = `${params[0].axisValue}<br/>`;

  params.forEach((param) => {
    const value = Number(param.value);
    const valueDisplay =
      value < 0
        ? `<span style="color: ${
            HUMIDITY_CHART_CONSTANTS.TOOLTIP.ERROR_COLOR
          }">oops! (${value.toFixed(1)}%)</span>`
        : `${value.toFixed(1)}%`;

    tooltipText += `
        <span style="display:inline-block;width:${HUMIDITY_CHART_CONSTANTS.TOOLTIP.DOT_SIZE}px;height:${HUMIDITY_CHART_CONSTANTS.TOOLTIP.DOT_SIZE}px;border-radius:50%;background-color:${param.color};margin-right:${HUMIDITY_CHART_CONSTANTS.TOOLTIP.DOT_MARGIN_RIGHT}px;"></span>
        ${param.seriesName}: <strong>${valueDisplay}</strong><br/>`;
  });

  return tooltipText;
};
