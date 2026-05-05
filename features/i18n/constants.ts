export const SYSTEM_SETTING_VALUE = 'system'

export const defaultLocale = 'en'
export const supportedLocales = [defaultLocale, 'de', 'hu', 'bg'] as const

export const validLocaleValues = [
  SYSTEM_SETTING_VALUE,
  ...supportedLocales,
] as const
