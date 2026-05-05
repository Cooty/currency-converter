import { validLocaleValues, supportedLocales } from '../constants'
import type { LocaleSettings, SupportedLocales } from '../types'

export function isValidLocaleSetting(
  setting: unknown
): setting is LocaleSettings {
  return (
    typeof setting === 'string' &&
    (validLocaleValues as readonly string[]).includes(setting)
  )
}

export function isValidSupportedLocale(
  setting: string | null
): setting is SupportedLocales {
  return (
    setting !== null &&
    (supportedLocales as readonly string[]).includes(setting)
  )
}
