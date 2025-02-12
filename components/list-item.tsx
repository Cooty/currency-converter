import {
  ViewProps,
  View,
  StyleSheet,
  GestureResponderEvent,
  useWindowDimensions,
} from 'react-native'
import { Highlight } from './highlight'
import { wrapperGutter, baseSize } from '../styles'
import { useSafeAreaGutter } from '../hooks'
import { useTheme } from '../features/theming'

export type ListItemProps = ViewProps & {
  isFirst?: boolean
  onPress?: (event?: GestureResponderEvent) => void
}

export function ListItem({ style, children, isFirst, onPress }: ListItemProps) {
  const { theme } = useTheme()
  const safeAreaGutter = useSafeAreaGutter()
  const { width } = useWindowDimensions()
  const wrapperHorizontalGutter =
    width > 400 ? wrapperGutter * 2 : wrapperGutter

  return (
    <View
      style={[
        componentStyles.listItem,
        {
          borderTopWidth: isFirst ? undefined : StyleSheet.hairlineWidth,
          paddingHorizontal: wrapperHorizontalGutter + safeAreaGutter,
          borderTopColor: theme.divider,
        },
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
    paddingVertical: baseSize(2),
  },
  insideBox: {
    padding: baseSize(),
  },
})
