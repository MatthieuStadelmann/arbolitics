import { ArboDataPoint } from "@/types/arbo";
import { TIME_RANGES } from "@/constants/arbo";

export const decodeTemperature = (value: number): number => {
  return Number((value / 10).toFixed(1));
};

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
 * Daily Aggregation: Returns raw data with converted temperatures.
 */
const aggregateDaily = (dataset: ArboDataPoint[]): ArboDataPoint[] => {
  return dataset.map((d) => ({
    ...d,
    tem1: decodeTemperature(d.tem1),
  }));
};

/**
 * Weekly Aggregation: Averages temperature per day in the week.
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
 * Monthly Aggregation: Averages temperature per week.
 */
const aggregateMonthly = (dataset: ArboDataPoint[]): ArboDataPoint[] => {
  console.log(
    "📌 Raw dataset in aggregateMonthly:",
    dataset.map((d) => ({
      TMS: new Date(d.TMS * 1000).toISOString(),
      rawTem1: d.tem1,
      decodedTem1: decodeTemperature(d.tem1),
    }))
  );

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

  console.log("📌 Grouped data by week in aggregateMonthly:", Object.entries(grouped).map(([week, points]) => ({
    week,
    temperatures: points.map(p => decodeTemperature(p.tem1))
  })));

  return calculateAverages(grouped);
};

/**
 * Helper function to calculate average temperature per period.
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
 * Helper function to get the Monday of a given date's week.
 */
const getMonday = (date: Date): Date => {
  const monday = new Date(date);
  const day = monday.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  monday.setDate(monday.getDate() + diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
};
