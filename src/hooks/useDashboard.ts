import { useState } from 'react';
import { TimeRange, Device } from '@/types/dashboard';
import { useArboData } from '@/hooks/useArboData';
import { useTimeRange } from '@/hooks/useTimeRange';
import { TIME_RANGES, DEVICE_IDS } from '@/constants/arbo';

export function useDashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>(TIME_RANGES.DAILY);
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);

  const { limit } = useTimeRange(selectedTimeRange);
  const { data, isLoading, error } = useArboData(10, limit);

  const timeRanges: TimeRange[] = [
    { id: TIME_RANGES.DAILY, label: 'Daily' },
    { id: TIME_RANGES.WEEKLY, label: 'Last 7 days' },
    { id: TIME_RANGES.MONTHLY, label: 'Last 4 weeks' },
  ];

  const devices: Device[] = [
    { id: DEVICE_IDS.DEVICE_1, name: 'Device 25_225', isActive: true },
    { id: DEVICE_IDS.DEVICE_2, name: 'Device 25_226', isActive: true },
  ];

  return {
    selectedTimeRange,
    setSelectedTimeRange,
    selectedDevices,
    setSelectedDevices,
    timeRanges,
    devices,
    data,
    isLoading,
    error
  };
} 