import { defaultLocale, supportedLocales } from '../constants'
import type { SupportedLocales } from '../types'
import { isValidSupportedLocale } from './validators'

export function getSupportedLocale(locale: string | null): SupportedLocales {
  if (!locale) {
    return defaultLocale
  }

  const normalizedLocale = locale.toLowerCase()

  for (const item of supportedLocales) {
    if (normalizedLocale === item || normalizedLocale.startsWith(`${item}-`)) {
      return item
    }
  }

  return defaultLocale
}
