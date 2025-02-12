import { View, ViewProps, StyleSheet, useWindowDimensions } from 'react-native'
import { wrapperGutter, baseSize } from '../styles'
import { useTheme } from '../features/theming'
import { useSafeAreaGutter } from '../hooks'

export function Container({ style, children }: ViewProps) {
  const safeAreaGutter = useSafeAreaGutter()
  const { width, height } = useWindowDimensions()
  const wrapperHorizontalGutter =
    width > 400 ? wrapperGutter * 2 : wrapperGutter
  const wrapperVerticalGutter = height > 700 ? wrapperGutter * 2 : wrapperGutter
  const { theme } = useTheme()
  return (
    <View
      style={[
        componentStyles.container,
        {
          backgroundColor: theme.background,
          paddingHorizontal: wrapperHorizontalGutter + safeAreaGutter,
          paddingVertical: wrapperVerticalGutter,
        },
        style,
      ]}
    >
      {children}
    </View>
  )
}

const componentStyles = StyleSheet.create({
  container: {
    flex: 1,
    gap: baseSize(5),
  },
})
