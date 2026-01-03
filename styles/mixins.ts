import { Platform } from 'react-native'

import { colors } from '../features/theming'

export const shadowMedium = {
  elevation: 4,
  shadowRadius: 6,
  shadowOpacity: 0.25,
  shadowColor: colors.light.shadow,
  shadowOffset: { width: -2, height: 4 },
}

export const underlinedText = {
  textDecorationLine: 'underline',
}

/**
 * Ensure we use the default system-UI font-family of the given platform.
 * Explicitly setting a font-family also mitigates this strange text cut-off
 * issue seen in some lower-end Android devices (Xiomi, Motora, Oppo, etc)
 * https://stackoverflow.com/a/63268164/6340282
 */
export const systemFontFamily = {
  fontFamily: Platform.select({
    ios: 'System',
    android: 'sans-serif',
    web: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  }),
}
