import { TooltipParams } from "@/types/charts";
import { TEMPERATURE_CHART_CONSTANTS } from "@/constants/temperateChartConsts";

export const formatTemperatureTooltip = (params: TooltipParams[]): string => {
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
      ${param.seriesName}: <strong>${Number(param.value).toFixed(1)}°C</strong><br/>`;
  });
  
  return tooltipText;
}; 