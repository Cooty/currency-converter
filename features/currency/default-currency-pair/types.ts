import { z } from 'zod'

import { WhatToShowOptionsSchema, CurrencyPairSettingSchema } from './schemas'

export type CurrencyPairSetting = z.infer<typeof CurrencyPairSettingSchema>

export type WhatToShowOptions = z.infer<typeof WhatToShowOptionsSchema>
