import { appStorage } from '../../../lib/storage'
import { isValidLocaleSetting } from './is-valid-locale-setting'

const STORAGE_KEY = 'locale_setting'

export async function getSavedLocaleSetting() {
  try {
    const savedLocaleSetting = await appStorage.getItem(STORAGE_KEY)
    if (!savedLocaleSetting) {
      return undefined
    }
    if (isValidLocaleSetting(savedLocaleSetting)) {
      return savedLocaleSetting
    }

    throw new Error(
      `The value "${savedLocaleSetting}" found in the local database is not a supported locale code`
    )
  } catch (e) {
    console.error(e)
    return undefined
  }
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
