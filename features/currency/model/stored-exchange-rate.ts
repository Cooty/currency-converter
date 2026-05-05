import { z } from 'zod'

import { StoredExchangeRateSchema, StoredExchangeRatesSchema } from './schemas'

export type StoredExchangeRate = z.infer<typeof StoredExchangeRateSchema>

export type StoredExchangeRates = z.infer<typeof StoredExchangeRatesSchema>
