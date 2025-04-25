import { useState } from 'react'
import { Modal } from 'react-native'

import {
  AppText,
  ModalHeader,
  Container,
  SegmentedControl,
} from '../../../components'
import { isIOS } from '../../../utils'

const timeFrameOptions = [
  { value: '5-days', label: 'Five days' },
  { value: '2-weeks', label: 'Two weeks' },
  {
    value: '1-month',
    label: 'Last month',
  },
]

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
  const [selectedTimeFrame, setSelectedTimeFrame] = useState(
    timeFrameOptions[0].value
  )

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
        <SegmentedControl
          initialValue={selectedTimeFrame}
          onChange={setSelectedTimeFrame}
          options={timeFrameOptions}
        />
        <AppText>History graph and time selection goes here...</AppText>
      </Container>
    </Modal>
  )
}
