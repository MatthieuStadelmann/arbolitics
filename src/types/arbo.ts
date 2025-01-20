import { DEVICE_IDS, TIME_RANGES } from "@/constants/arbo";

export interface ArboDataPoint {
  DID: string;
  FMW: number;
  TMS: number;
  bvol: number;
  tem1: number;
  hum1: number;
  solr: number;
  prec: number;
  wind: number;
  wins: number;
  lwet: number;
}

export interface ArboApiResponse {
  data: ArboDataPoint[];
  message?: string;
}

export interface ArboDataResponse {
  [key: `device_${string}`]: ArboDataPoint[];
}

export type TimeRange = keyof typeof TIME_RANGES;

export type TimeRangeOption = {
  id: TimeRange;
  label: typeof TIME_RANGES[TimeRange];
};

export type DeviceId = (typeof DEVICE_IDS)[keyof typeof DEVICE_IDS];
