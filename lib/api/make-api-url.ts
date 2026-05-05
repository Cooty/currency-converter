import { AppConfig } from '../../config'

import type { CurrencyAPIEndpoints } from './types'
import { CurrencyAPIEndpointsSchema } from './schemas'
import { shouldUseProxy } from './should-use-proxy'

function urlParamsFromObject(obj: Record<string, string>) {
  const searchParams = new URLSearchParams(obj)

  return searchParams.toString()
}

export function makeCurrencyApiUrl(
  endpoint: CurrencyAPIEndpoints,
  params?: Record<string, string>
) {
  const validation = CurrencyAPIEndpointsSchema.safeParse(endpoint)

  if (!validation.success) {
    throw new Error(
      `"${endpoint}" is not a valid API endpoint name or it's currently not yet supported`
    )
  }

  const apiRoot = shouldUseProxy()
    ? AppConfig.proxyHost
    : AppConfig.currencyAPIHost
  const searchParams = params ? `?${urlParamsFromObject(params)}` : ''

  return `${apiRoot}/v${AppConfig.currencyAPIVersion}/${endpoint}${searchParams}`
}
