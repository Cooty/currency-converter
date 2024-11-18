import AsyncStorage from '@react-native-async-storage/async-storage'
import { DEFAULT_SETTING, STORAGE_KEY } from './constants'
import type { ThemeOptions } from './types'

export async function getSavedThemeSetting() {
  try {
    return (await AsyncStorage.getItem(STORAGE_KEY)) as ThemeOptions | null
  } catch (e) {
    console.error(e)
    return DEFAULT_SETTING
  }
}

export function saveThemeSetting(themeOption: ThemeOptions) {
  try {
    AsyncStorage.setItem(STORAGE_KEY, themeOption)
  } catch (e) {
    console.error(e)
  }
}
