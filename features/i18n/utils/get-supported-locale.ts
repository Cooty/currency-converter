import { defaultLocale, supportedLocales } from '../constants'
import type { SupportedLocales } from '../types'

export function getSupportedLocale(locale: string | null): {
  resolvedLocale: SupportedLocales
  isSupported: boolean
} {
  if (!locale) {
    return { resolvedLocale: defaultLocale, isSupported: false }
  }

  const normalizedLocale = locale.toLowerCase()

  for (const item of supportedLocales) {
    if (normalizedLocale === item || normalizedLocale.startsWith(`${item}-`)) {
      return { resolvedLocale: item, isSupported: true }
    }
  }

  return { resolvedLocale: defaultLocale, isSupported: false }
}
