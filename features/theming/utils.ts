import { appStorage } from '../../lib/storage'
import { DEFAULT_SETTING, STORAGE_KEY } from './constants'
import type { ThemeOptions } from './types'

export async function getSavedThemeSetting() {
  try {
    return (await appStorage.getItem(STORAGE_KEY)) as ThemeOptions | null
  } catch (e) {
    console.error(e)
    return DEFAULT_SETTING
  }
}

export async function saveThemeSetting(themeOption: ThemeOptions) {
  await appStorage.setItem(STORAGE_KEY, themeOption)
}
