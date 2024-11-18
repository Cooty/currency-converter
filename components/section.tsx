import { PropsWithChildren, ReactNode } from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { wrapperGutter, baseSize } from '../styles'
import { useTheme } from '../features/theming'
import type { AppTitleProps } from './app-title'
import { AppTitle } from './app-title'

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

  return (
    <View
      style={[
        componentStyles.section,
        {
          borderBottomWidth: !isLast ? StyleSheet.hairlineWidth : undefined,
          borderBottomColor: !isLast ? theme.divider : undefined,
        },
        style,
      ]}
    >
      {title && (
        <AppTitle
          priority={2}
          style={{ marginBottom: baseSize(1) }}
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
