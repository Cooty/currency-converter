import { z } from 'zod'

const themeNames = ['light', 'dark'] as const
export const themeOptions = [...themeNames, 'system'] as const

export const ThemeNamesSchema = z.enum(themeNames)
export const ThemeOptionsSchema = z.enum(themeOptions)
