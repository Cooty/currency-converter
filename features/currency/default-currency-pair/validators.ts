import { WhatToShowOptionsSchema, CurrencyPairSettingSchema } from './schemas'
import { WhatToShowOptions, CurrencyPairSetting } from './types'

export function isWhatToShowOptions(
  value: unknown
): value is WhatToShowOptions {
  return WhatToShowOptionsSchema.safeParse(value).success
}

export function isCurrencyPairSetting(
  value: unknown
): value is CurrencyPairSetting {
  return CurrencyPairSettingSchema.safeParse(value).success
}
