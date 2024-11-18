import type { ThemeOptions } from './types'

export const themeOptions = [
  {
    label: 'System',
    hint: 'Follow the system setting',
    value: 'system',
  },
  {
    label: 'Light mode',
    value: 'light',
  },
  {
    label: 'Dark mode',
    value: 'dark',
  },
]

export const STORAGE_KEY = 'theme_setting'
export const DEFAULT_SETTING = 'system' as ThemeOptions
