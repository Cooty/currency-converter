import { z } from 'zod'

import { CurrencyAPIEndpointsSchema } from './schemas'

export type CurrencyAPIEndpoints = z.infer<typeof CurrencyAPIEndpointsSchema>
