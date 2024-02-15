import { FC } from 'react'
import { useState } from 'react'
import {
  View,
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  Modal,
  Button,
} from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements'
import styles from '../../config/styles'
import SearchInput from '../ui/SearchInput'
import { isAndroid } from '../../utils'

interface CurrencyListOverlayProps {
  isVisible: boolean
  onCurrencySelection: () => void
}

const CurrencyListOverlay: FC<CurrencyListOverlayProps> = ({
  isVisible,
  onCurrencySelection,
}) => {
  const headerHeight = useHeaderHeight()
  const [searchValue, setSearchValue] = useState('')

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="fullScreen"
      hardwareAccelerated
    >
      <SafeAreaView style={componentStyles.modalInner}>
        <View
          style={[
            componentStyles.modalHeader,
            {
              height: headerHeight,
              backgroundColor: isAndroid() ? styles.colors.brand : undefined,
            },
          ]}
        >
          <SearchInput
            value={searchValue}
            onChangeText={setSearchValue}
            placeholder="Start typing (eg.: USD or Dollars)"
            onCancel={onCurrencySelection}
          />
        </View>
        <Button title="Selected the currency" onPress={onCurrencySelection} />
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
    paddingHorizontal: styles.baseSize * 5,
    justifyContent: 'center',
    borderColor: styles.colors.light.divider,
    borderBottomWidth: 1,
  },
})

export default CurrencyListOverlay
