import AsyncStorage from '@react-native-async-storage/async-storage'

import type { WhatToShowOptions, CurrencyPairSetting } from './types'

const WHAT_TO_SHOW_FIRST_KEY = 'what-to-show-first'
const DEFAULT_CURRENCY_PAIR_KEY = 'default-currency-pair'

export async function saveWhatToShowFirst(setting: WhatToShowOptions) {
  await AsyncStorage.setItem(WHAT_TO_SHOW_FIRST_KEY, setting)
}

export async function getWhatToShowFirst() {
  const savedValue = await AsyncStorage.getItem(WHAT_TO_SHOW_FIRST_KEY)

  if (!savedValue) {
    return null
  }

  return savedValue as WhatToShowOptions
}

export async function saveDefaultCurrencyPair(
  defaultCurrencyPair: CurrencyPairSetting
) {
  await AsyncStorage.setItem(
    DEFAULT_CURRENCY_PAIR_KEY,
    JSON.stringify(defaultCurrencyPair)
  )
}

export async function getDefaultCurrencyPair() {
  const savedValue = await AsyncStorage.getItem(DEFAULT_CURRENCY_PAIR_KEY)

  if (!savedValue) {
    return null
  }

  return JSON.parse(savedValue) as CurrencyPairSetting
}
