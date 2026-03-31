import { StyleProp, ViewStyle } from 'react-native'
import { Trans } from '@lingui/react/macro'

import { PlatformAdaptiveButton } from '../../../components'
import { Currency, useStoredExchangeRates } from '../../../features/currency'

export interface AddToFavoritesProps {
  style?: StyleProp<ViewStyle>
  base: Currency
  target: Currency
  exchangeRate: number
  retrievedAt: number
}

export function AddToFavorites({
  base,
  target,
  retrievedAt,
  exchangeRate,
  style,
}: AddToFavoritesProps) {
  const {
    isSavedToFavorites,
    addStoredExchangeRate,
    unFavoriteStoredExchangeRate,
  } = useStoredExchangeRates()
  const isFavorite = isSavedToFavorites(base.code, target.code)

  function onFavoritesPress() {
    if (isFavorite) {
      unFavoriteStoredExchangeRate(base.code, target.code)
    } else {
      addStoredExchangeRate({
        base,
        target,
        isFavorite: true,
        retrievedAt,
        exchangeRate,
      })
    }
  }

  return (
    <PlatformAdaptiveButton
      icon={isFavorite ? 'unfavorite' : 'favorite'}
      elevated
      style={style}
      onPress={onFavoritesPress}
      hug
    >
      {isFavorite ? (
        <Trans>Remove from favorites</Trans>
      ) : (
        <Trans>Add to favorites</Trans>
      )}
    </PlatformAdaptiveButton>
  )
}
