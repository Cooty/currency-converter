import * as Application from 'expo-application'
import Constants from 'expo-constants'

export function getAppVersion() {
  const configuredVersion = Constants.expoConfig?.version ?? 'unknown'
  const nativeVersion = Application.nativeApplicationVersion
  if (nativeVersion && nativeVersion === configuredVersion) {
    return nativeVersion
  }

  return `${configuredVersion}-dev`
}
