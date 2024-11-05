import { StyleProp, ViewStyle } from 'react-native'
import { PlatformAdaptiveButton } from '../../../components'

export interface HistoryProps {
  style?: StyleProp<ViewStyle>
}

export function History({ style }: HistoryProps) {
  return (
    <PlatformAdaptiveButton variant="secondary" icon="history" style={style}>
      History
    </PlatformAdaptiveButton>
  )
}
