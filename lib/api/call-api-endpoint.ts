import { AppConfig } from '../../config'
import { makeCurrencyApiUrl } from './make-api-url'
import { shouldUseProxy } from './should-use-proxy'

import type { CurrencyAPIEndpoints } from './types'
import { APIError } from './model'

import { createSignedHeaders } from '../../lib/signing/create-signed-headers'

export async function callApiEndPoint<T>(
  endpoint: CurrencyAPIEndpoints,
  params?: Record<string, string>
): Promise<T> {
  const apiURL = makeCurrencyApiUrl(endpoint, params)

  const headers = shouldUseProxy()
    ? await createSignedHeaders({ method: 'GET', url: apiURL })
    : { apikey: AppConfig.currencyAPIKey }

  const request = await fetch(apiURL, {
    headers,
  })
  if (request.ok) {
    const response = (await request.json()) as T

    return response
  } else {
    const errorResponse = (await request.json()) as APIError
    throw new Error(errorResponse.message)
  }
}
