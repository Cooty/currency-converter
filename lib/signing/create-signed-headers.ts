import { Platform } from 'react-native'
import * as Application from 'expo-application'

import { AppConfig } from '../../config'
import { getAppVersion } from '../../utils'

import { buildCanonicalString, normalizeQuery } from './build-canonical-string'
import { signCanonicalString } from './signing'

export async function createSignedHeaders(input: {
  method: string
  url: string
}): Promise<Record<string, string>> {
  const parsedUrl = new URL(input.url)
  const timestamp = String(Math.floor(Date.now() / 1000))

  const canonical = buildCanonicalString({
    method: input.method,
    path: parsedUrl.pathname,
    query: normalizeQuery(parsedUrl.searchParams),
    timestamp,
  })

  const signature = await signCanonicalString(
    AppConfig.requestSigningSecret,
    canonical
  )

  return {
    'x-timestamp': timestamp,
    'x-signature': signature,
    'x-client-version': getAppVersion(),
    'x-client-platform': Platform.OS ?? 'unknown',
  }
}
