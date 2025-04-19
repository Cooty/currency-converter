import { Modal } from 'react-native'

import { AppText, ModalHeader, Container } from '../../../components'
import { isIOS } from '../../../utils'

export interface HistoryOverlayProps {
  isVisible: boolean
  onCancel: () => void
  baseCurrencyCode: string
  targetCurrencyCode: string
}

export function HistoryOverlay({
  isVisible,
  onCancel,
  baseCurrencyCode,
  targetCurrencyCode,
}: HistoryOverlayProps) {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle={isIOS() ? 'pageSheet' : 'fullScreen'}
      hardwareAccelerated
    >
      <ModalHeader onCancel={onCancel}>
        {`${baseCurrencyCode} - ${targetCurrencyCode} Exchange Rates`}
      </ModalHeader>
      <Container>
        <AppText>History graph and time selection goes here...</AppText>
      </Container>
    </Modal>
  )
}
