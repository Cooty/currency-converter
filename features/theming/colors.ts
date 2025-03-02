export const colors = {
  brand: 'rgb(0, 35, 149)', // Imperial Blue
  onBrand: 'rgb(255, 255, 255)',
  onBrandSecondary: 'rgba(255, 255, 255, 0.7)',
  white: 'rgb(255, 255, 255)',
  black: 'rgb(0, 0, 0)',
  brandAlpha: 'rgba(0, 35, 149, 0.2)',
  rippleOnBrand: 'rgba(255, 255, 255, 0.2)',
  light: {
    text: 'rgb(0, 5, 22)',
    textSecondary: 'rgba(59, 64, 69, 0.8)',
    background: 'rgba(255, 255, 255, 1)',
    elevation: 'rgba(255, 255, 255, 1)',
    divider: 'rgba(0, 0, 0, 0.1)',
    shadow: 'rgba(0, 0, 0, 0.8)',
    rippleOnBackground: 'rgba(0, 0, 0, 0.2)',
    red: 'rgb(253, 91, 91)',
    backdrop: 'rgba(0, 0, 0, 0.4)',
    inputFocus: 'rgb(50, 96, 247)',
    androidTabBarBackground: 'rgb(225, 232, 255)',
  },
  // TODO: Add colors for dark mode
  dark: {
    text: 'rgb(242, 245, 255)',
    textSecondary: 'rgb(182, 188, 194)',
    background: 'rgb(28, 30, 31)',
    backdrop: 'rgba(0, 0, 0, 0.8)',
    divider: 'rgba(255, 255, 255, 0.1)',
    shadow: 'rgba(0, 0, 0, 0.8)',
    rippleOnBackground: 'rgba(255, 255, 255, 0.2)',
    red: 'rgb(219, 57, 57)',
    inputFocus: 'rgb(30, 81, 247)',
    elevation: 'rgb(44, 46, 48)',
    androidTabBarBackground: 'rgb(20, 24, 37)',
  },
}

export type ThemeType = typeof colors.light
