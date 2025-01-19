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

export interface DashboardFiltersProps {
  timeRanges: TimeRange[];
  devices: Device[];
  selectedTimeRange: string;
  selectedDevices: string[];
  onTimeRangeChange: (value: string) => void;
  onDeviceChange: (value: string) => void;
} 