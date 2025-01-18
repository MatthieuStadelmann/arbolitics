import { TimeRange as ArboTimeRange } from "@/constants/arbo";

export interface TimeRange {
  id: ArboTimeRange;
  label: string;
}

export interface Device {
  id: string;
  name: string;
  isActive: boolean;
} 