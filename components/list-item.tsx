import {
  ViewProps,
  View,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native'
import { Highlight } from './highlight'
import { wrapperGutter, baseSize } from '../styles'
import { useTheme } from '../features/theming'

export type ListItemProps = ViewProps & {
  isFirst?: boolean
  onPress?: (event?: GestureResponderEvent) => void
}

export function ListItem({ style, children, isFirst, onPress }: ListItemProps) {
  const { theme } = useTheme()
  return (
    <View
      style={[
        componentStyles.listItem,
        { borderTopWidth: isFirst ? undefined : StyleSheet.hairlineWidth },
        { borderTopColor: theme.divider },
        style,
      ]}
    >
      {onPress ? (
        <Highlight onPress={onPress} style={componentStyles.insideBox}>
          {children}
        </Highlight>
      ) : (
        <View style={componentStyles.insideBox}>{children}</View>
      )}
    </View>
  )
}

const componentStyles = StyleSheet.create({
  listItem: {
    paddingHorizontal: wrapperGutter,
    paddingVertical: baseSize(),
  },
  insideBox: {
    padding: baseSize(),
  },
})
