import { useState, useMemo } from "react";
import { Device } from "@/types/dashboard";
import { useArboData } from "@/hooks/useArboData";
import { useTimeRange } from "@/hooks/useTimeRange";
import { DEVICE_IDS, TIME_RANGE_KEYS, TIME_RANGES } from "@/constants/arbo";
import { ArboDataPoint, TimeRangeOption } from "@/types/arbo";

export function useDashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>(
    TIME_RANGES.DAILY
  );
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const { limit } = useTimeRange(selectedTimeRange);
  const { data, isLoading, error } = useArboData(10, limit);
  const timeRanges: TimeRangeOption[] = [
    { id: TIME_RANGE_KEYS.DAILY, label: TIME_RANGES[TIME_RANGE_KEYS.DAILY] },
    { id: TIME_RANGE_KEYS.WEEKLY, label: TIME_RANGES[TIME_RANGE_KEYS.WEEKLY] },
    {
      id: TIME_RANGE_KEYS.MONTHLY,
      label: TIME_RANGES[TIME_RANGE_KEYS.MONTHLY],
    },
  ];

  const devices: Device[] = [
    { id: DEVICE_IDS.DEVICE_1, name: "Device 25_225", isActive: true },
    { id: DEVICE_IDS.DEVICE_2, name: "Device 25_226", isActive: true },
  ];

  const filteredData = useMemo(() => {
    if (!data) return [];

    if (selectedDevices.length === 0) {
      return [...(data.device_25_225 || []), ...(data.device_25_226 || [])];
    }

    let selectedData: ArboDataPoint[] = [];

    if (selectedDevices.includes(DEVICE_IDS.DEVICE_1)) {
      selectedData = [...selectedData, ...(data.device_25_225 || [])];
    }

    if (selectedDevices.includes(DEVICE_IDS.DEVICE_2)) {
      selectedData = [...selectedData, ...(data.device_25_226 || [])];
    }

    return selectedData;
  }, [data, selectedDevices]);

  return {
    selectedTimeRange,
    setSelectedTimeRange,
    selectedDevices,
    setSelectedDevices,
    timeRanges,
    devices,
    data: filteredData,
    isLoading,
    error,
  };
}
