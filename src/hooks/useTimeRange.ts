import { TIME_RANGE_KEYS } from "@/constants/arbo";
import { TimeRange } from "@/types/arbo";
import { useMemo } from "react";

export function useTimeRange(timeRange: TimeRange) {
  const limit = useMemo(() => {
    switch (timeRange) {
      case TIME_RANGE_KEYS.DAILY:
        return 24;
      case TIME_RANGE_KEYS.WEEKLY:
        return 24 * 7;
      case TIME_RANGE_KEYS.MONTHLY:
        return 24 * 7 * 4;
      default:
        return 24;
    }
  }, [timeRange]);

  return { limit };
}
