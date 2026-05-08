import type { CurrencyApiEndpoints, ApiConfig } from './types'
import { CurrencyApiEndpointsSchema } from './schemas'
import { shouldUseProxy } from './should-use-proxy'

function urlParamsFromObject(obj: Record<string, string>) {
  const searchParams = new URLSearchParams(obj)

  return searchParams.toString()
}

export function makeCurrencyApiUrl(
  endpoint: CurrencyApiEndpoints,
  config: ApiConfig,
  params?: Record<string, string>
) {
  const validation = CurrencyApiEndpointsSchema.safeParse(endpoint)

  if (!validation.success) {
    throw new Error(
      `"${endpoint}" is not a valid Api endpoint name or it's currently not yet supported`
    )
  }

  const apiRoot = shouldUseProxy() ? config.proxyHost : config.host
  const searchParams = params ? `?${urlParamsFromObject(params)}` : ''

  return `${apiRoot}/v${config.version}/${endpoint}${searchParams}`
}
