import { makeCurrencyApiUrl } from './make-api-url'
import { shouldUseProxy } from './should-use-proxy'

import type { CurrencyApiEndpoints, ApiConfig } from './types'
import { ApiError } from './model'

import { createSignedHeaders } from '../signing/create-signed-headers'

export class ApiClient {
  constructor(private config: ApiConfig) {}

  async callApiEndPoint<T>(
    endpoint: CurrencyApiEndpoints,
    params?: Record<string, string>
  ): Promise<T> {
    const apiURL = makeCurrencyApiUrl(endpoint, this.config, params)

    const headers = shouldUseProxy()
      ? await createSignedHeaders({ method: 'GET', url: apiURL })
      : { apikey: this.config.key }

    const request = await fetch(apiURL, {
      headers,
    })
    if (request.ok) {
      const response = (await request.json()) as T

      return response
    } else {
      const errorResponse = (await request.json()) as ApiError
      throw new Error(errorResponse.message)
    }
  }
}
