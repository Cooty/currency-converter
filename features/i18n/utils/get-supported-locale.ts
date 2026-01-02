import { defaultLocale, supportedLocales } from '../constants'

export function getSupportedLocale(locale: string | null) {
  let matchingSupportedLocale = defaultLocale
  if (!locale) {
    return matchingSupportedLocale
  }
  const normalizedLocale = locale.toLowerCase()

  for (let i = 0; i < supportedLocales.length; i++) {
    const item = supportedLocales[i]

    if (normalizedLocale === item || normalizedLocale.startsWith(`${item}-`)) {
      matchingSupportedLocale = item
      break
    }
  }

  return matchingSupportedLocale
}
