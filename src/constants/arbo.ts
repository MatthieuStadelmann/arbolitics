export const DEVICE_IDS = {
  DEVICE_1: "25_225",
  DEVICE_2: "25_226",
} as const;

export const TIME_RANGE_KEYS = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY'
} as const;

export const TIME_RANGES = {
  [TIME_RANGE_KEYS.DAILY]: 'daily',
  [TIME_RANGE_KEYS.WEEKLY]: 'weekly',
  [TIME_RANGE_KEYS.MONTHLY]: 'monthly'
} as const;

export const DATAPOINTS_PER_DAY = 24;
export const DAYS_PER_WEEK = 7;
export const WEEKS_PER_MONTH = 4;

export const ARBOLITICS_LOGIN_ENDPOINT = "/auth/login" as const;
export const LOCATION_ID = 10 as const;
export const ARBOLITICS_DATASET_ENDPOINT =
  "/data/getArboliticsDataset" as const;
