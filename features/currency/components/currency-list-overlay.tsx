import { useState, useEffect, useRef, RefObject } from 'react'
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Modal,
  TextInput,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors, useTheme } from '../../theming'
import { SearchInput, ModalHeader } from '../../../components/'
import { isIOS, isAndroid } from '../../../utils'
import { Currency } from '../model'
import { CurrencyListItem } from './currency-list-item'
import { filterCurrencies } from '../utils'
import { useCurrencies } from '../context'
import { getAllCurrenciesAsArraySortedAlphabetically } from '../utils'

export interface CurrencyListOverlayProps {
  isVisible: boolean
  onCurrencySelection: (currency: Currency) => void
  onCancel: () => void
  onShow?: () => void
}

export function CurrencyListOverlay({
  isVisible,
  onCurrencySelection,
  onCancel,
  onShow,
}: CurrencyListOverlayProps) {
  const { theme } = useTheme()
  const [searchValue, setSearchValue] = useState('')
  const currencies = useCurrencies()
  const sortedCurrencies =
    getAllCurrenciesAsArraySortedAlphabetically(currencies)
  const [filteredCurrencies, setFilteredCurrencies] =
    useState<Currency[]>(sortedCurrencies)
  const searchInputRef: RefObject<TextInput> = useRef(null)

  useEffect(() => {
    if (searchValue.length !== 0) {
      setFilteredCurrencies(filterCurrencies(searchValue, filteredCurrencies))
    } else {
      setFilteredCurrencies(sortedCurrencies)
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
          // We also need the setTimeout otherwise it doesn't work
          setTimeout(() => {
            searchInputRef.current?.focus()
          }, 50)
        }

        onShow?.()
      }}
    >
      <SafeAreaView
        style={[
          componentStyles.modalInner,
          {
            backgroundColor: theme.background,
          },
        ]}
        edges={['top', 'bottom']}
      >
        <KeyboardAvoidingView
          behavior={isIOS() ? 'height' : undefined}
          style={componentStyles.modalInner}
        >
          <ModalHeader>
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
          </ModalHeader>
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
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.brand,
  },
  scrollableContent: {
    flex: 1,
  },
})
