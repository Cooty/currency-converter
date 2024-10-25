import { ScrollView, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { Container } from '../../components/ui'
import { CurrencyPairListItem } from '../../components/currency'
import { CurrencyPair, useStoredExchangeRates } from '../../services/currency'
import { EmptyState } from './components'
import type { RootTabsParamList } from '../../navigation/types'

type FavoritesScreenProps = BottomTabScreenProps<RootTabsParamList, 'Favorites'>

function FavoritesScreen({ navigation }: FavoritesScreenProps) {
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

      <StatusBar style="light" />
    </Container>
  )
}

const componentStyles = StyleSheet.create({
  container: {
    padding: 0,
  },
  scrollView: {
    flex: 1,
  },
})

export default FavoritesScreen
