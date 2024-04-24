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
  const authParam = `apikey=${AppConfig.currencyAPIKey}`
  const searchParams = params
    ? `?${urlParamsFromObject(params)}&${authParam}`
    : `?${authParam}`

  return `https://${AppConfig.currencyAPIHost}/v${AppConfig.currencyAPIVersion}/${endpoint}${searchParams}`
}
