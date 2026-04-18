import type { TranslatedStringMap, TranslatedName } from '../types'
import { CURRENCY_NAME_TRANSLATIONS } from '../currency-name-translations'

function isTranslatedNameKey(
  value: string
): value is keyof TranslatedStringMap {
  return value === 'en' || value === 'de' || value === 'hu' || value === 'bg'
}

export function getTranslatedString(
  appLocale: string,
  fallback: string,
  translations?: TranslatedStringMap
) {
  if (!translations || appLocale === 'en') {
    return fallback
  }

  if (isTranslatedNameKey(appLocale)) {
    return translations[appLocale]
  }

  return fallback
}

function hasTranslatedName(
  code: string
): code is keyof typeof CURRENCY_NAME_TRANSLATIONS {
  return code in CURRENCY_NAME_TRANSLATIONS
}

export function getTranslatedName(code: string) {
  if (hasTranslatedName(code)) {
    return CURRENCY_NAME_TRANSLATIONS[code] as TranslatedName
  }

  return undefined
}
