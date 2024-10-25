import {
  ViewProps,
  View,
  StyleSheet,
  GestureResponderEvent,
  PlatformColor,
} from 'react-native'
import Highlight from './Highlight'
import { wrapperGutter, theme, baseSize } from '../../styles'
import { isIOS } from '../../utils'

export type ListItemProps = ViewProps & {
  isFirst?: boolean
  onPress?: (event?: GestureResponderEvent) => void
}

function ListItem({ style, children, isFirst, onPress }: ListItemProps) {
  return (
    <View
      style={[
        componentStyles.listItem,
        { borderTopWidth: isFirst ? undefined : StyleSheet.hairlineWidth },
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
    borderTopColor: isIOS()
      ? PlatformColor('separator')
      : theme.colors.light.divider,
  },
  insideBox: {
    padding: baseSize(),
  },
})

export default ListItem
