export const DEVICE_IDS = {
  DEVICE_1: '25_225',
  DEVICE_2: '25_226',
} as const;

export type DeviceId = typeof DEVICE_IDS[keyof typeof DEVICE_IDS];

export const TIME_RANGES = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
} as const;

export type TimeRange = typeof TIME_RANGES[keyof typeof TIME_RANGES];

export const DATAPOINTS_PER_DAY = 24;
export const DAYS_PER_WEEK = 7;
export const WEEKS_PER_MONTH = 4;

export const ARBOLITICS_LOGIN_ENDPOINT = '/auth/login' as const;
export const LOCATION_ID = 10 as const;
export const ARBOLITICS_DATASET_ENDPOINT = '/data/getArboliticsDataset' as const;
