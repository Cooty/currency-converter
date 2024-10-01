import { AppConfig } from '../config'

type CurrencyAPIEndpoints = 'status' | 'currencies' | 'latest' | 'historical'

function urlParamsFromObject(obj: Record<string, string>) {
  const searchParams = new URLSearchParams(obj)

  return searchParams.toString()
}

export function makeCurrencyApiUrl(
  endpoint: CurrencyAPIEndpoints,
  params?: Record<string, string>
) {
  // In production we'll use a proxy that adds the API key to the requests on the backend, cause we don't want to have API keys in the production bundle
  const authParam = __DEV__ ? `apikey=${AppConfig.currencyAPIKey}` : ''
  const searchParams = params
    ? `?${urlParamsFromObject(params)}&${authParam}`
    : `?${authParam}`

  return `https://${AppConfig.currencyAPIHost}/v${AppConfig.currencyAPIVersion}/${endpoint}${searchParams}`
}
