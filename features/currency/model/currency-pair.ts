import { z } from 'zod'

import { CurrencyPairSchema } from './schemas'

export type CurrencyPair = z.infer<typeof CurrencyPairSchema>
