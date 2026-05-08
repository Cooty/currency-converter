import { buildCanonicalString, normalizeQuery } from './build-canonical-string'
import { signCanonicalString } from './signing'

interface SignedHeadersInput {
  method: string
  url: string
  appVersion: string
  platform: string
  secret: string
}

async function createSignedHeaders({
  method,
  url,
  appVersion,
  platform,
  secret,
}: SignedHeadersInput) {
  const parsedUrl = new URL(url)
  const timestamp = String(Math.floor(Date.now() / 1000))

  const canonical = buildCanonicalString({
    method,
    path: parsedUrl.pathname,
    query: normalizeQuery(parsedUrl.searchParams),
    timestamp,
  })

  const signature = await signCanonicalString(secret, canonical)

  return {
    'x-timestamp': timestamp,
    'x-signature': signature,
    'x-client-version': appVersion,
    'x-client-platform': platform,
  }
}

export function makeCreateSignedHeaders(appVersion: string, platform: string) {
  return (method: string, url: string, secret: string) =>
    createSignedHeaders({ method, url, appVersion, platform, secret })
}
