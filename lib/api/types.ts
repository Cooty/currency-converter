import { z } from 'zod'

import { CurrencyApiEndpointsSchema } from './schemas'

export type CurrencyApiEndpoints = z.infer<typeof CurrencyApiEndpointsSchema>

export interface ApiConfig {
  version: string
  key: string
  host: string
  proxyHost: string
}
