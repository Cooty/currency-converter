import { StyleProp, ViewStyle } from 'react-native'
import { PlatformAdaptiveButton } from '../../../components'

export interface HistoryProps {
  style?: StyleProp<ViewStyle>
  onPress: () => void
}

export function ShowHistory({ style, onPress }: HistoryProps) {
  return (
    <PlatformAdaptiveButton
      variant="secondary"
      icon="history"
      style={style}
      onPress={onPress}
    >
      History
    </PlatformAdaptiveButton>
  )
}
