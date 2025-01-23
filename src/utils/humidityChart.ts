import { ArboDataPoint } from "@/types/arbo";
import { ChartSeries } from "@/types/charts";

export const processHumidityData = (
  deviceData: ArboDataPoint[],
  deviceConfig: {
    name: string;
    color: string;
  }
): ChartSeries | null => {
  if (!deviceData.length) return null;

  return {
    name: deviceConfig.name,
    type: "bar",
    data: deviceData.map((d: ArboDataPoint) => d.hum1),
    color: deviceConfig.color,
  };
};
