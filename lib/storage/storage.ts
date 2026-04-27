import AsyncStorage from '@react-native-async-storage/async-storage'

import type { DataWithExpirationDate } from './types'
import { safeJSONParse, makeErrorMessage, isRecord } from './helpers'

class Storage {
  /**
   * This can later be passed through the constructor
   * so we can create different instances as we switch over
   * to V3 of `react-native-async-storage`
   * see:https://react-native-async-storage.github.io/3.0/migration-to-3/#asyncstorage-is-now-instance-based
   */
  constructor(private storage = AsyncStorage) {}

  public async getItem<T = string>(
    key: string,
    validate?: (value: unknown) => value is T
  ) {
    try {
      const savedValue = await this.storage.getItem(key)
      if (savedValue === null) return null
      const parsedValue = safeJSONParse(savedValue)

      if (validate && !validate(parsedValue)) {
        return null
      }

      return parsedValue as T
    } catch (e) {
      console.error(makeErrorMessage(e, key))
      return null
    }
  }

  public async setItem(key: string, value: unknown) {
    try {
      return await this.storage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.error(makeErrorMessage(e, key))
      return null
    }
  }

  /**
   * Save data to the storage with an expiration date
   * If you set a value with this method you must use the
   * corresponding `getItemWithExpirationDate` to read it!
   */
  public async setItemWithExpirationDate(
    key: string,
    value: unknown,
    expirationDate: Date
  ) {
    try {
      if (Number.isNaN(expirationDate.getTime())) {
        throw new Error(
          `Invalid expiration date for key "${key}", expirationDate was: "${String(expirationDate)}"`
        )
      }
      const envelope: DataWithExpirationDate = {
        data: value,
        savedAt: new Date().toISOString(),
        expirationDate: expirationDate.toISOString(),
      }
      return await this.storage.setItem(key, JSON.stringify(envelope))
    } catch (e) {
      console.error(makeErrorMessage(e, key))
      return null
    }
  }

  /**
   * Read a value that was set with an expiration date (using `setItemWithExpirationDate`)
   * If the time of retrieval is past the expiration date, then `null` will be returned and the
   * value will be deleted
   */
  public async getItemWithExpirationDate<T = string>(
    key: string,
    validate?: (value: unknown) => value is T
  ) {
    try {
      const savedValue = await this.storage.getItem(key)
      if (savedValue === null) return null

      const parsedValue = safeJSONParse(savedValue)

      if (
        !isRecord(parsedValue) ||
        !('data' in parsedValue) ||
        !('expirationDate' in parsedValue)
      ) {
        throw new Error(
          `Error reading key: "${key}" with getItemWithExpirationDate, does not seem to be compatible with the data format needed for expiration date. Are you sure you've saved it using "setItemWithExpirationDate", value: ${savedValue}`
        )
      }

      const expiresAt = new Date(String(parsedValue.expirationDate))

      if (Number.isNaN(expiresAt.getTime())) {
        throw new Error(
          `Invalid expiration date for key "${key}" saved expirationDate was: "${String(parsedValue.expirationDate)}"`
        )
      }

      if (Date.now() > expiresAt.getTime()) {
        await this.storage.removeItem(key)
        return null
      }

      if (validate && !validate(parsedValue.data)) {
        return null
      }

      return parsedValue.data as T
    } catch (e) {
      console.error(makeErrorMessage(e, key))
      return null
    }
  }
}

export const appStorage = new Storage()
