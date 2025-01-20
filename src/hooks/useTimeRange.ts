import { TimeRange } from "@/types/arbo";
import { useMemo } from "react";

export function useTimeRange(timeRange: TimeRange) {
  const limit = useMemo(() => {
    switch (timeRange) {
      case "DAILY":
        return 24;
      case "WEEKLY":
        return 24 * 7;
      case "MONTHLY":
        return 24 * 30;
      default:
        return 24;
    }
  }, [timeRange]);

  return { limit };
}
//
