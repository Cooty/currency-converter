import { z } from 'zod'

import { CurrencyCodeSchema } from '../model/schemas'

export const WhatToShowOptionsSchema = z.enum(['default', 'last'])

export const CurrencyPairSettingSchema = z.object({
  base: CurrencyCodeSchema,
  target: CurrencyCodeSchema,
})
