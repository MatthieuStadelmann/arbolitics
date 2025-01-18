import { Select } from '@/components/ui/Select';
import { TimeRange, Device } from '@/types/dashboard';

interface DashboardFiltersProps {
  timeRanges: TimeRange[];
  devices: Device[];
  selectedTimeRange: string;
  selectedDevices: string[];
  onTimeRangeChange: (value: string) => void;
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
      <Select
        value={selectedTimeRange}
        onChange={onTimeRangeChange}
        options={timeRanges.map(range => ({
          value: range.id,
          label: range.label
        }))}
      />
      <Select
        value={selectedDevices[0] || ''}
        onChange={onDeviceChange}
        options={devices.map(device => ({
          value: device.id,
          label: device.name
        }))}
        placeholder="All Devices"
      />
    </div>
  );
}