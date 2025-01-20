import { ArboDataPoint } from "@/types/arbo";
import { TIME_RANGES } from "@/constants/arbo";
import { TEMPERATURE_CHART_CONSTANTS } from "@/constants/chart";
import { ChartSeries } from "@/types/chart";

/**
 * Converts raw temperature value to human-readable format
 * @param value - Raw temperature value from sensor
 * @returns Decoded temperature value with one decimal place
 */
export const decodeTemperature = (value: number): number => {
  return Number((value / 10).toFixed(1));
};

/**
 * Formats timestamp based on selected time range
 * @param timestamp - Unix timestamp in seconds
 * @param timeRange - Selected time range (daily/weekly/monthly)
 * @returns Formatted date string according to time range
 */
export const formatDate = (timestamp: number, timeRange: string): string => {
  const date = new Date(timestamp * 1000);

  if (timeRange === TIME_RANGES.DAILY) {
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Berlin",
    });
  }

  if (timeRange === TIME_RANGES.WEEKLY) {
    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      timeZone: "Europe/Berlin",
    });
  }

  if (timeRange === TIME_RANGES.MONTHLY) {
    const firstDayOfWeek = new Date(date);
    firstDayOfWeek.setDate(date.getDate() - date.getDay());

    return `Week of ${firstDayOfWeek.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      timeZone: "Europe/Berlin",
    })}`;
  }
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    timeZone: "Europe/Berlin",
  });
};

/**
 * Aggregates data points based on time range
 * @param dataset - Array of data points
 * @param timeRange - Selected time range (daily/weekly/monthly)
 * @returns Aggregated data points
 */
export const aggregateData = (
  dataset: ArboDataPoint[],
  timeRange: string
): ArboDataPoint[] => {
  if (!dataset.length) return [];

  switch (timeRange) {
    case TIME_RANGES.DAILY:
      return aggregateDaily(dataset);
    case TIME_RANGES.WEEKLY:
      return aggregateWeekly(dataset);
    case TIME_RANGES.MONTHLY:
      return aggregateMonthly(dataset);
    default:
      return dataset;
  }
};

/**
 * Daily aggregation of temperature data
 * @param dataset - Array of data points
 * @returns Data points with decoded temperatures
 */
const aggregateDaily = (dataset: ArboDataPoint[]): ArboDataPoint[] => {
  return dataset.map((d) => ({
    ...d,
    tem1: decodeTemperature(d.tem1),
  }));
};

/**
 * Weekly aggregation of temperature data
 * @param dataset - Array of data points
 * @returns Data points averaged per day
 */
const aggregateWeekly = (dataset: ArboDataPoint[]): ArboDataPoint[] => {
  const grouped: Record<string, ArboDataPoint[]> = {};

  dataset.forEach((d) => {
    const date = new Date(d.TMS * 1000);
    date.setHours(0, 0, 0, 0); // Normalize to start of the day
    const period = date.toISOString().split("T")[0]; // Group by YYYY-MM-DD

    if (!grouped[period]) {
      grouped[period] = [];
    }
    grouped[period].push(d);
  });

  return calculateAverages(grouped);
};

/**
 * Monthly aggregation of temperature data
 * @param dataset - Array of data points
 * @returns Data points averaged per week
 */
const aggregateMonthly = (dataset: ArboDataPoint[]): ArboDataPoint[] => {

  const grouped: Record<string, ArboDataPoint[]> = {};

  dataset.forEach((d) => {
    const date = new Date(d.TMS * 1000);
    const firstDayOfWeek = getMonday(date);
    const period = firstDayOfWeek.toISOString().split("T")[0];

    if (!grouped[period]) {
      grouped[period] = [];
    }
    grouped[period].push(d);
  });

  return calculateAverages(grouped);
};

/**
 * Calculates average temperature for grouped data points
 * @param grouped - Record of data points grouped by period
 * @returns Array of averaged data points
 */
const calculateAverages = (
  grouped: Record<string, ArboDataPoint[]>
): ArboDataPoint[] => {
  return Object.entries(grouped).map(([date, points]) => {
    const avgTemp =
      points.reduce((sum, p) => sum + decodeTemperature(p.tem1), 0) /
      points.length;
    const lastPoint = points[points.length - 1];

    return {
      ...lastPoint,
      TMS: new Date(date).getTime() / 1000,
      tem1: avgTemp,
    };
  });
};

/**
 * Gets the Monday date of a given week
 * @param date - Date to get Monday from
 * @returns Date object set to Monday of the week
 */
const getMonday = (date: Date): Date => {
  const monday = new Date(date);
  const day = monday.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  monday.setDate(monday.getDate() + diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
};

/**
 * Filters X-axis labels based on time range
 * @param timeRange - Selected time range (daily/weekly/monthly)
 * @param xAxisLabels - Array of all X-axis labels
 * @returns Filtered array of labels
 */
export const getXAxisLabels = (timeRange: string, xAxisLabels: string[]) => {
  switch (timeRange) {
    case TIME_RANGES.WEEKLY:
      return xAxisLabels.slice(-7);
    case TIME_RANGES.MONTHLY:
      return xAxisLabels.slice(-4);
    case TIME_RANGES.DAILY:
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
export const processDeviceData = (
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
    data: deviceData.map((d) => d.tem1),
    color: deviceConfig.color,
    smooth: TEMPERATURE_CHART_CONSTANTS.LINE_STYLE.SMOOTH,
    symbol: TEMPERATURE_CHART_CONSTANTS.LINE_STYLE.SYMBOL,
    symbolSize: TEMPERATURE_CHART_CONSTANTS.LINE_STYLE.SYMBOL_SIZE,
    lineStyle: {
      width: TEMPERATURE_CHART_CONSTANTS.LINE_STYLE.LINE_WIDTH,
      type: TEMPERATURE_CHART_CONSTANTS.LINE_STYLE.LINE_TYPE
    }
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
    max: Math.ceil(max + buffer)
  };
};