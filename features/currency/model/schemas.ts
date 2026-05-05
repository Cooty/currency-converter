import { z } from 'zod'

export const CurrencyCodeSchema = z.string().length(3).uppercase()

export const CurrencySchema = z.object({
  symbol: z.string(),
  name: z.string(),
  symbol_native: z.string(),
  decimal_digits: z.number(),
  rounding: z.number(),
  code: CurrencyCodeSchema,
  name_plural: z.string(),
})

export const CurrencyListSchema = z.object({
  data: z.record(CurrencyCodeSchema, CurrencySchema),
})

export const CurrencyPairSchema = z.object({
  base: CurrencySchema,
  target: CurrencySchema,
})

export const UnixTimestamp = z
  .number()
  .int()
  .min(0)
  .refine((val) => val < 1e10 || val >= 1e12, {
    message: 'Invalid Unix timestamp format',
  })

export const CurrencyCodePairSchema = z
  .string()
  .regex(/^[A-Z]{3}_[A-Z]{3}$/, 'Invalid format')
  .refine((val) => {
    const [base, target] = val.split('_')
    return base !== target
  }, 'Base and target currencies must differ')

export const StoredExchangeRateSchema = CurrencyPairSchema.extend({
  exchangeRate: z.number(),
  retrievedAt: UnixTimestamp,
  isFavorite: z.boolean().optional(),
})

export const StoredExchangeRatesSchema = z.record(
  CurrencyCodePairSchema,
  StoredExchangeRateSchema
)

export const ExchangeRatesSchema = z.object({
  data: z.record(CurrencyCodeSchema, z.number()),
})
