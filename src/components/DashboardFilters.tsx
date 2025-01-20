import { Select } from "@/components/ui/Select";
import { TimeRange, TimeRangeOption } from "@/types/arbo";
import { Device } from "@/types/dashboard";

interface DashboardFiltersProps {
  timeRanges: TimeRangeOption[];
  devices: Device[];
  selectedTimeRange: TimeRange;
  selectedDevices: string[];
  onTimeRangeChange: (value: TimeRange) => void;
  onDeviceChange: (value: string) => void;
}

export function DashboardFilters({
  timeRanges,
  devices,
  selectedTimeRange,
  selectedDevices,
  onTimeRangeChange,
  onDeviceChange,
}: DashboardFiltersProps) {
  return (
    <div className="mb-8 flex gap-4">
      <Select<TimeRange>
        value={selectedTimeRange}
        onChange={onTimeRangeChange}
        className="capitalize"
        options={timeRanges.map((range: TimeRangeOption) => ({
          value: range.id,
          label: range.label,
        }))}
      />
      <Select
        value={selectedDevices[0] || ""}
        onChange={onDeviceChange}
        options={devices.map((device: Device) => ({
          value: device.id,
          label: device.name,
        }))}
        placeholder="All Devices"
      />
    </div>
  );
}
