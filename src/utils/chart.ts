import { ArboDataPoint } from "@/types/arbo";
import { TIME_RANGES } from "@/constants/arbo";
import { Unit } from "@/types/chart";

export const decodeTemperature = (value: number): number => {
  return Number((value / 10).toFixed(1));
};

export const convertTemperature = (temp: number, unit: Unit): number => {
  const decodedTemp = decodeTemperature(temp);
  return Number((unit === "F" ? (decodedTemp * 9) / 5 + 32 : decodedTemp).toFixed(1));
};

export const formatDate = (timestamp: number, timeRange: string): string => {
  const date = new Date(timestamp * 1000);
  return timeRange === TIME_RANGES.DAILY
    ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : date.toLocaleDateString([], { month: "short", day: "numeric" });
};

export const aggregateData = (dataset: ArboDataPoint[], timeRange: string): ArboDataPoint[] => {
  if (timeRange === TIME_RANGES.DAILY) {
    return dataset.map(d => ({
      ...d,
      tem1: decodeTemperature(d.tem1)
    }));
  }

  const grouped: Record<string, ArboDataPoint[]> = {};

  dataset.forEach((d) => {
    const date = new Date(d.TMS * 1000);
    let period;

    if (timeRange === TIME_RANGES.WEEKLY) {
      date.setHours(0, 0, 0, 0);
      period = date.toISOString().split('T')[0];
    } else {
      const day = date.getDay();
      const diff = date.getDate() - day + (day === 0 ? -6 : 1);
      const monday = new Date(date.setDate(diff));
      period = monday.toISOString().split('T')[0];
    }

    if (!grouped[period]) {
      grouped[period] = [];
    }
    grouped[period].push(d);
  });

  return Object.entries(grouped)
    .map(([, points]) => {
      const avgTemp = points.reduce((sum, p) => sum + decodeTemperature(p.tem1), 0) / points.length;
      const lastPoint = points[points.length - 1];
      return {
        ...lastPoint,
        tem1: avgTemp
      };
    })
    .sort((a, b) => a.TMS - b.TMS);
}; 