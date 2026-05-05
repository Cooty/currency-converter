import { appStorage } from '../../lib/storage'

import { DEFAULT_SETTING, STORAGE_KEY } from './constants'
import type { ThemeOptions } from './types'
import { isValidThemeOption } from './validators'

export async function getSavedThemeSetting() {
  try {
    return await appStorage.getItem<ThemeOptions>(
      STORAGE_KEY,
      isValidThemeOption
    )
  } catch (e) {
    console.error(e)
    return DEFAULT_SETTING
  }
}

export async function saveThemeSetting(themeOption: ThemeOptions) {
  await appStorage.setItem(STORAGE_KEY, themeOption)
}
