import { FC } from 'react'
import {
  View,
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  Modal,
  Button,
} from 'react-native'

interface CurrencyListOverlayProps {
  isVisible: boolean
  onCurrencySelection: () => void
}

const CurrencyListOverlay: FC<CurrencyListOverlayProps> = ({
  isVisible,
  onCurrencySelection,
}) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="fullScreen"
      hardwareAccelerated
    >
      <SafeAreaView style={componentStyles.modalInner}>
        <Button title="Selected the currency" onPress={onCurrencySelection} />
      </SafeAreaView>
    </Modal>
  )
}

const componentStyles = StyleSheet.create({
  modalInner: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default CurrencyListOverlay
