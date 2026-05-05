import { ThemeOptionsSchema } from './schemas'
import type { ThemeOptions } from './types'

export function isValidThemeOption(value: unknown): value is ThemeOptions {
  return ThemeOptionsSchema.safeParse(value).success
}
