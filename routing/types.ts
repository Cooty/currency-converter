export type ConvertScreenParamsList = {
  baseCurrencyCode: string
  targetCurrencyCode: string
}

export type RootTabsParamList = {
  Convert: ConvertScreenParamsList
  Favorites: undefined
  Settings: undefined
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabsParamList {}
  }
}
