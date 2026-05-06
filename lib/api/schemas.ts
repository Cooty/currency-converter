import { z } from 'zod'

export const CurrencyApiEndpointsSchema = z.enum([
  'status',
  'currencies',
  'latest',
  'historical',
])
