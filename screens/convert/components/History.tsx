import { StyleProp, ViewStyle } from 'react-native'
import { PlatformAdaptiveButton } from '../../../components/ui'

export interface HistoryProps {
  style?: StyleProp<ViewStyle>
}

function History({ style }: HistoryProps) {
  return (
    <PlatformAdaptiveButton variant="secondary" icon="history" style={style}>
      History
    </PlatformAdaptiveButton>
  )
}

export default History
