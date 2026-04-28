import { appStorage } from '../../../lib/storage'
import { isValidLocaleSetting } from './validators'
import { LocaleSettings } from '../types'

const STORAGE_KEY = 'locale_setting'

export async function getSavedLocaleSetting() {
  return await appStorage.getItem<LocaleSettings>(
    STORAGE_KEY,
    isValidLocaleSetting
  )
}

export async function saveLocaleSetting(value: string) {
  try {
    if (isValidLocaleSetting(value)) {
      await appStorage.setItem(STORAGE_KEY, value)
      return true
    }

    throw new Error(
      `The value "${value}" is not a supported locale code, so it won't be saved to the local database`
    )
  } catch (e) {
    console.error(e)
    return false
  }
}
