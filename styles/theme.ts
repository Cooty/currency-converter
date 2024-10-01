const theme = {
  baseSize: 4,
  baseFontSize: 16,
  minFontSize: 12,
  baseLineHeightRatio: 1.5,
  buttonFontSize: 18,
  buttonFontWeight: '500',
  fontSizeIncrement: 2,
  defaultRadius: 20,
  colors: {
    brand: 'rgb(0, 35, 149)', // Imperial Blue
    onBrand: 'rgb(255, 255, 255)',
    onBrandSecondary: 'rgba(255, 255, 255, 0.7)',
    white: 'rgb(255, 255, 255)',
    black: 'rgb(0, 0, 0)',
    brandAlpha: 'rgba(0, 35, 149, 0.2)',
    rippleOnBrand: 'rgba(255, 255, 255, 0.2)',
    light: {
      text: 'rgb(0, 5, 22)',
      textSecondary: 'rgba(59, 64, 69, 0.7)',
      background: 'rgba(255, 255, 255, 1)',
      divider: 'rgba(0, 0, 0, 0.1)',
      shadow: 'rgba(0, 0, 0, 0.8)',
      rippleOnBackground: 'rgba(0, 0, 0, 0.2)',
      red: 'rgb(253, 91, 91)',
      backdrop: 'rgba(0, 0, 0, 0.1)',
    },
    // TODO: Add colors for dark mode
    dark: {
      text: 'rgb(242, 245, 255)',
    },
  },
} as const

export const wrapperGutter = theme.baseSize * 4

export default theme
