import { z } from 'zod'

import {
  CurrencySchema,
  CurrencyListSchema,
  ExchangeRatesSchema,
} from './schemas'

export type Currency = z.infer<typeof CurrencySchema>
export type CurrencyList = z.infer<typeof CurrencyListSchema>

// export interface ExchangeRates {
//   data: Record<string, number>
// }

export type ExchangeRates = z.infer<typeof ExchangeRatesSchema>
