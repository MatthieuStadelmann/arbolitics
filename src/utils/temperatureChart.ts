import { ArboDataPoint, TimeRange } from "@/types/arbo";
import { ChartSeries } from "@/types/charts";
import { TEMPERATURE_CHART_CONSTANTS } from "@/constants/temperateChartConsts";
import { TIME_RANGE_KEYS } from "@/constants/arbo";
/**
 * Formats timestamp based on selected time range
 * @param timestamp - Unix timestamp in seconds
 * @param timeRange - Selected time range (daily/weekly/monthly)
 * @returns Formatted date string according to time range
 */
export const formatDate = (timestamp: number, timeRange: TimeRange): string => {
  const date = new Date(timestamp * 1000);
  switch (timeRange) {
    case TIME_RANGE_KEYS.DAILY:
      return date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Berlin",
      });

    case TIME_RANGE_KEYS.WEEKLY:
      return date.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        timeZone: "Europe/Berlin",
      });

    case TIME_RANGE_KEYS.MONTHLY:
      const firstDayOfWeek = new Date(date);
      firstDayOfWeek.setDate(date.getDate() - date.getDay());
      return `Week of ${firstDayOfWeek.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        timeZone: "Europe/Berlin",
      })}`;

    default:
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        timeZone: "Europe/Berlin",
      });
  }
};

/**
 * Filters X-axis labels based on time range
 * @param timeRange - Selected time range (daily/weekly/monthly)
 * @param xAxisLabels - Array of all X-axis labels
 * @returns Filtered array of labels
 */
export const getXAxisLabels = (timeRange: TimeRange, xAxisLabels: string[]) => {
  switch (timeRange) {
    case TIME_RANGE_KEYS.WEEKLY:
      return xAxisLabels.slice(-7);
    case TIME_RANGE_KEYS.MONTHLY:
      return xAxisLabels.slice(-4);
    case TIME_RANGE_KEYS.DAILY:
      return xAxisLabels.filter((_, index) => index % 2 === 0);
    default:
      return xAxisLabels;
  }
};

/**
 * Processes device data into chart series format
 * @param deviceData - Array of data points for a device
 * @param deviceConfig - Device name and color configuration
 * @returns Chart series configuration or null if no data
 */
export const processTemperatureData = (
  deviceData: ArboDataPoint[],
  deviceConfig: {
    name: string;
    color: string;
  }
): ChartSeries | null => {
  if (!deviceData.length) return null;

  return {
    name: deviceConfig.name,
    type: TEMPERATURE_CHART_CONSTANTS.CHART_TYPE,
    data: deviceData.map((dataPoint: ArboDataPoint) => dataPoint.tem1),
    color: deviceConfig.color,
    smooth: TEMPERATURE_CHART_CONSTANTS.LINE_STYLE.SMOOTH,
    symbol: TEMPERATURE_CHART_CONSTANTS.LINE_STYLE.SYMBOL,
    symbolSize: TEMPERATURE_CHART_CONSTANTS.LINE_STYLE.SYMBOL_SIZE,
    lineStyle: {
      width: TEMPERATURE_CHART_CONSTANTS.LINE_STYLE.LINE_WIDTH,
      type: TEMPERATURE_CHART_CONSTANTS.LINE_STYLE.LINE_TYPE,
    },
  };
};

/**
 * Calculates Y-axis bounds with buffer
 * @param temps - Array of temperature values
 * @returns Minimum and maximum bounds for Y-axis
 */
export const calculateAxisBounds = (temps: number[]) => {
  if (!temps.length) return { min: 0, max: 1 };

  const min = Math.min(...temps);
  const max = Math.max(...temps);
  const buffer = Math.max(2, (max - min) * 0.2);

  return {
    min: Math.floor(min - buffer),
    max: Math.ceil(max + buffer),
  };
};
