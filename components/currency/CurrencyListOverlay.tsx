import { useEffect, useRef, RefObject } from 'react'
import { useState } from 'react'
import {
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Modal,
  TextInput,
} from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements'
import { wrapperGutter, theme } from '../../styles/'
import SearchInput from '../ui/SearchInput'
import { isIOS, isAndroid } from '../../utils'
import { Currency } from '../../services/currency'
import CurrencyListItem from './CurrencyListItem'
import { filterCurrencies } from '../../services/currency'

interface CurrencyListOverlayProps {
  isVisible: boolean
  onCurrencySelection: (currency: Currency) => void
  onCancel: () => void
  currencies: Currency[]
  onShow?: () => void
}

function CurrencyListOverlay({
  isVisible,
  currencies,
  onCurrencySelection,
  onCancel,
  onShow,
}: CurrencyListOverlayProps) {
  const headerHeight = useHeaderHeight()
  const [searchValue, setSearchValue] = useState('')
  const [filteredCurrencies, setFilteredCurrencies] =
    useState<Currency[]>(currencies)
  const searchInputRef: RefObject<TextInput> = useRef(null)

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
      onShow={() => {
        // The soft-keyboard doesn't show up when adding `autoFocus` to the `<SearchInput />`
        // https://github.com/software-mansion/react-native-screens/issues/89
        if (isAndroid()) {
          // We also ned the setTimeout otherwise it doesn't work
          setTimeout(() => {
            searchInputRef.current?.focus()
          }, 50)
        }

        onShow?.()
      }}
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
              // on iOS this works as expected but for Android we have to use a workaround
              // the two might clash with each other
              autoFocus={isIOS()}
              value={searchValue}
              textContentType="countryName"
              onChangeText={setSearchValue}
              placeholder="Start typing (eg.: USD or Dollars)"
              onCancel={onCancel}
              ref={searchInputRef}
            />
          </View>
          <ScrollView
            style={componentStyles.scrollableContent}
            keyboardDismissMode="on-drag"
          >
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
