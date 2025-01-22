export const COLORS = {
  GRAY_50: '#F9FAFB',
  GRAY_100: '#F3F4F6',
  GRAY_200: '#E5E7EB',
  GRAY_600: '#4B5563',
  GRAY_700: '#374151',
  WHITE: '#FFFFFF',
} as const;

export const FONTS = {
  PRIMARY: 'Manrope',
} as const;

export const GRID_THEME_CONFIG = {
  fontFamily: FONTS.PRIMARY,
  wrapperBorder: { color: COLORS.GRAY_200 },
  headerRowBorder: { color: COLORS.GRAY_200 },
  rowBorder: { color: COLORS.GRAY_200 },
  columnBorder: { color: COLORS.GRAY_200 },
  headerBackgroundColor: COLORS.WHITE,
  headerFontColor: COLORS.GRAY_700,
  fontColor: COLORS.GRAY_600,
} as const; 