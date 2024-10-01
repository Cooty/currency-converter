import { FC, useEffect } from 'react'
import { useState } from 'react'
import {
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Modal,
} from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements'
import { wrapperGutter, theme } from '../../styles/'
import SearchInput from '../ui/SearchInput'
import { isIOS } from '../../utils'
import { Currency, CurrencyList } from '../../services/currency'
import CurrencyListItem from './CurrencyListItem'
import {
  filterCurrencies,
  getAllCurrenciesAsArray,
} from '../../services/currency'

interface CurrencyListOverlayProps {
  isVisible: boolean
  onCurrencySelection: (currency: Currency) => void
  onCancel: () => void
  currencies: Currency[]
}

const CurrencyListOverlay: FC<CurrencyListOverlayProps> = ({
  isVisible,
  currencies,
  onCurrencySelection,
  onCancel,
}) => {
  const headerHeight = useHeaderHeight()
  const [searchValue, setSearchValue] = useState('')
  const [filteredCurrencies, setFilteredCurrencies] =
    useState<Currency[]>(currencies)

  useEffect(() => {
    if (searchValue.length !== 0) {
      setFilteredCurrencies(filterCurrencies(searchValue, filteredCurrencies))
    } else {
      setFilteredCurrencies(currencies)
    }
  }, [searchValue])

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle={isIOS() ? 'pageSheet' : 'fullScreen'}
      hardwareAccelerated
    >
      <SafeAreaView style={componentStyles.modalInner}>
        <KeyboardAvoidingView
          behavior={isIOS() ? 'height' : undefined}
          style={componentStyles.modalInner}
        >
          <View
            style={[
              componentStyles.modalHeader,
              {
                height: headerHeight,
              },
            ]}
          >
            <SearchInput
              value={searchValue}
              textContentType="countryName"
              onChangeText={setSearchValue}
              placeholder="Start typing (eg.: USD or Dollars)"
              onCancel={onCancel}
              autoFocus
            />
          </View>
          <ScrollView style={componentStyles.scrollableContent}>
            {filteredCurrencies.map((currency, i) => (
              <CurrencyListItem
                currency={currency}
                isFirst={i === 0}
                onPress={(currency) => {
                  onCurrencySelection(currency)
                  setSearchValue('')
                }}
                key={`${currency.code}-${i}`}
              />
            ))}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  )
}

const componentStyles = StyleSheet.create({
  modalInner: {
    flex: 1,
    width: '100%',
  },
  modalHeader: {
    paddingHorizontal: wrapperGutter,
    justifyContent: 'center',
    borderColor: theme.colors.light.divider,
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.brand,
  },
  scrollableContent: {
    flex: 1,
  },
})

export default CurrencyListOverlay
