import { SYSTEM_SETTING_VALUE, supportedLocales } from '../constants'

export function isValidLocaleSetting(setting: string) {
  const validValues = [...supportedLocales, SYSTEM_SETTING_VALUE]
  return validValues.includes(setting)
}
