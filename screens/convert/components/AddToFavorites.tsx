import { PlatformAdaptiveButton } from '../../../components/ui'
import { StyleProp, ViewStyle } from 'react-native'
import { Currency, useStoredExchangeRates } from '../../../services/currency'

export interface AddToFavoritesProps {
  style?: StyleProp<ViewStyle>
  base: Currency
  target: Currency
  exchangeRate: number
  retrievedAt: number
}

function AddToFavorites({
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
    >
      {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    </PlatformAdaptiveButton>
  )
}

export default AddToFavorites
