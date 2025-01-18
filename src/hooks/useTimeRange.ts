import { 
  DATAPOINTS_PER_DAY, 
  DAYS_PER_WEEK, 
  WEEKS_PER_MONTH, 
  TIME_RANGES 
} from '@/constants/arbo';

export const useTimeRange = (timeRange: string) => {
  const getDataPointLimit = (range: string): number => {
    switch (range) {
      case TIME_RANGES.DAILY:
        return DATAPOINTS_PER_DAY;
      case TIME_RANGES.WEEKLY:
        return DATAPOINTS_PER_DAY * DAYS_PER_WEEK;
      case TIME_RANGES.MONTHLY:
        return DATAPOINTS_PER_DAY * DAYS_PER_WEEK * WEEKS_PER_MONTH;
      default:
        return DATAPOINTS_PER_DAY;
    }
  };

  return {
    limit: getDataPointLimit(timeRange)
  };
}; 