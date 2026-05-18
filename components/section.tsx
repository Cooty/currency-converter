import type { PropsWithChildren, ReactNode } from 'react'
import {
  View,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
  useWindowDimensions,
} from 'react-native'
import { wrapperGutter, baseSize } from '../styles'
import { useTheme } from '../features/theming'
import type { AppTitleProps } from './app-title'
import { AppTitle } from './app-title'
import { useSafeAreaGutter } from '../hooks'

export type SectionProps = PropsWithChildren & {
  title?: ReactNode
  titleProps?: AppTitleProps
  isLast?: boolean
  style?: StyleProp<ViewStyle>
}

export function Section({
  children,
  style,
  isLast,
  title,
  titleProps,
}: SectionProps) {
  const { theme } = useTheme()
  const safeAreaGutter = useSafeAreaGutter()
  const { width } = useWindowDimensions()
  const wrapperHorizontalGutter =
    width > 400 ? wrapperGutter * 2 : wrapperGutter
  const wrapperVerticalGutter = wrapperGutter * 2

  return (
    <View
      style={[
        componentStyles.section,
        {
          borderBottomWidth: !isLast ? StyleSheet.hairlineWidth : undefined,
          borderBottomColor: !isLast ? theme.divider : undefined,
          paddingHorizontal: safeAreaGutter + wrapperHorizontalGutter,
          paddingVertical: wrapperVerticalGutter,
        },
        style,
      ]}
    >
      {title && (
        <AppTitle
          priority={2}
          style={{ marginBottom: baseSize(4) }}
          {...titleProps}
        >
          {title}
        </AppTitle>
      )}
      {children}
    </View>
  )
}

const componentStyles = StyleSheet.create({
  section: {
    padding: wrapperGutter,
  },
})
