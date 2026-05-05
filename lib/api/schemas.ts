import { z } from 'zod'

export const CurrencyAPIEndpointsSchema = z.enum([
  'status',
  'currencies',
  'latest',
  'historical',
])
