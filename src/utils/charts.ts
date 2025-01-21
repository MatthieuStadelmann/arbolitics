import { ArboDataPoint, TimeRange } from "@/types/arbo";

/**
 * Converts raw sensor value to human-readable format with one decimal place
 * @param value - Raw sensor value
 * @returns Decoded value with one decimal place
 */
export const decodeValue = (value: number, min?: number): number => {
  if (min) {
    if (value < min) return 0;
  }
  return Number((value / 10).toFixed(1));
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
 * Calculates average values for grouped data points
 * @param grouped - Record of data points grouped by period
 * @param valueKey - Key of the value to average (e.g., 'tem1' or 'hum1')
 * @returns Array of averaged data points
 */
const calculateAverages = (
  grouped: Record<string, ArboDataPoint[]>,
  valueKey: keyof Pick<ArboDataPoint, "tem1" | "hum1">
): ArboDataPoint[] => {
  return Object.entries(grouped).map(([date, points]) => {
    const avgValue =
      points.reduce(
        (sum, p) =>
          sum + decodeValue(p[valueKey], valueKey === "hum1" ? 0 : undefined),
        0
      ) / points.length;
    const lastPoint = points[points.length - 1];

    return {
      ...lastPoint,
      TMS: new Date(date).getTime() / 1000,
      [valueKey]: avgValue,
    };
  });
};

/**
 * Aggregates data points based on time range
 * @param dataset - Array of data points
 * @param timeRange - Selected time range (daily/weekly/monthly)
 * @param valueKey - Key of the value to aggregate (e.g., 'tem1' or 'hum1')
 * @returns Aggregated data points
 */
export const aggregateData = (
  dataset: ArboDataPoint[],
  timeRange: TimeRange,
  valueKey: keyof Pick<ArboDataPoint, "tem1" | "hum1"> = "tem1"
): ArboDataPoint[] => {
  if (!dataset.length) return [];

  switch (timeRange) {
    case "DAILY":
      return dataset.map((d: ArboDataPoint) => ({
        ...d,
        [valueKey]: decodeValue(d[valueKey]),
      }));

    case "WEEKLY": {
      const grouped: Record<string, ArboDataPoint[]> = {};
      dataset.forEach((d: ArboDataPoint) => {
        const date = new Date(d.TMS * 1000);
        date.setHours(0, 0, 0, 0);
        const period = date.toISOString().split("T")[0];
        if (!grouped[period]) grouped[period] = [];
        grouped[period].push(d);
      });
      return calculateAverages(grouped, valueKey);
    }

    case "MONTHLY": {
      const grouped: Record<string, ArboDataPoint[]> = {};
      dataset.forEach((d: ArboDataPoint) => {
        const date = new Date(d.TMS * 1000);
        const firstDayOfWeek = getMonday(date);
        const period = firstDayOfWeek.toISOString().split("T")[0];
        if (!grouped[period]) grouped[period] = [];
        grouped[period].push(d);
      });
      return calculateAverages(grouped, valueKey);
    }

    default:
      return dataset;
  }
};
