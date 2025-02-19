export const tokens = {
  baseSize: 4,
  baseFontSize: 16,
  minFontSize: 12,
  baseLineHeightRatio: 1.5,
  buttonFontSize: 18,
  buttonFontWeight: '500',
  fontSizeIncrement: 2,
  defaultRadius: 20,
  androidMinTapArea: 48,
  iosMinTapArea: 44,
} as const

export const wrapperGutter = tokens.baseSize * 4
