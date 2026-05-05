import { z } from 'zod'

import { ThemeNamesSchema, ThemeOptionsSchema } from './schemas'

export type ThemeNames = z.infer<typeof ThemeNamesSchema>
export type ThemeOptions = z.infer<typeof ThemeOptionsSchema>
