import { ScrollView, StyleSheet } from 'react-native'
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { Container } from '../../components'
import { CurrencyPairListItem } from '../../features/currency/components'
import { CurrencyPair, useStoredExchangeRates } from '../../features/currency'
import { EmptyState } from './components'
import type { RootTabsParamList } from '../../routing/types'

export type FavoritesScreenProps = BottomTabScreenProps<
  RootTabsParamList,
  'Favorites'
>

export function FavoritesScreen({ navigation }: FavoritesScreenProps) {
  const { getFavorites } = useStoredExchangeRates()
  const favorites = getFavorites()

  function onPressCurrencyPair(currencyPair: CurrencyPair) {
    navigation.navigate('Convert', {
      baseCurrencyCode: currencyPair.base.code,
      targetCurrencyCode: currencyPair.target.code,
    })
  }

  return (
    <Container style={componentStyles.container}>
      {favorites ? (
        <ScrollView style={componentStyles.scrollView}>
          {favorites.map((stored, i) => (
            <CurrencyPairListItem
              currencyPair={{ base: stored.base, target: stored.target }}
              key={`favorite-${stored.base?.code}-${stored.target?.code}-${i}`}
              isFirst={i === 0}
              onPress={onPressCurrencyPair}
            />
          ))}
        </ScrollView>
      ) : (
        <EmptyState />
      )}
    </Container>
  )
}

const componentStyles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  scrollView: {
    flex: 1,
  },
})
