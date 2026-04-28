import { validLocaleValues, supportedLocales } from './constants'

export type SupportedLocales = (typeof supportedLocales)[number]

export type TranslatedStringMap = Record<SupportedLocales, string>

export interface TranslatedName {
  name: TranslatedStringMap
  name_plural: TranslatedStringMap
}

export type LocaleSettings = (typeof validLocaleValues)[number]
