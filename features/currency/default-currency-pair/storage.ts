import { appStorage } from '../../../lib/storage'

import type { WhatToShowOptions, CurrencyPairSetting } from './types'
import { isWhatToShowOptions, isCurrencyPairSetting } from './validators'

const WHAT_TO_SHOW_FIRST_KEY = 'what-to-show-first'
const DEFAULT_CURRENCY_PAIR_KEY = 'default-currency-pair'

export async function saveWhatToShowFirst(setting: WhatToShowOptions) {
  await appStorage.setItem(WHAT_TO_SHOW_FIRST_KEY, setting)
}

export async function getWhatToShowFirst() {
  return await appStorage.getItem<WhatToShowOptions>(
    WHAT_TO_SHOW_FIRST_KEY,
    isWhatToShowOptions
  )
}

export async function saveDefaultCurrencyPair(
  defaultCurrencyPair: CurrencyPairSetting
) {
  await appStorage.setItem(DEFAULT_CURRENCY_PAIR_KEY, defaultCurrencyPair)
}

export async function getDefaultCurrencyPair() {
  return await appStorage.getItem<CurrencyPairSetting>(
    DEFAULT_CURRENCY_PAIR_KEY,
    isCurrencyPairSetting
  )
}
