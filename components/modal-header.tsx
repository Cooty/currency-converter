import { View, StyleSheet, ViewProps, useWindowDimensions } from 'react-native'

import { HeaderTitle } from '@react-navigation/elements'
import { useHeaderHeight } from '@react-navigation/elements'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { CloseButton, CLOSE_BUTTON_SIZE } from './close-button'

import { colors, useTheme } from '../features/theming'
import { wrapperGutter, baseSize } from '../styles'
import { useSafeAreaGutter } from '../hooks'

import { isIOS } from '../utils'

export type ModalHeaderProps = ViewProps & {
  onCancel?: () => void
}

export function ModalHeader({
  children,
  style,
  onCancel,
  ...props
}: ModalHeaderProps) {
  const headerHeight = useHeaderHeight()
  const safeAreaGutter = useSafeAreaGutter()
  const { top } = useSafeAreaInsets()
  const { width } = useWindowDimensions()
  const { theme } = useTheme()
  const wrapperHorizontalGutter =
    width > 400 ? wrapperGutter * 2 : wrapperGutter
  const isChildString = typeof children === 'string'
  const gutter = wrapperHorizontalGutter + safeAreaGutter

  return (
    <View
      style={[
        componentStyles.modalHeader,
        {
          height: headerHeight,
          borderColor: theme.divider,
          paddingTop: top,
          paddingHorizontal: wrapperHorizontalGutter + safeAreaGutter,
        },
        style,
      ]}
      {...props}
    >
      {onCancel && (
        <CloseButton
          onPress={onCancel}
          iconColor={colors.onBrand}
          style={{ marginStart: gutter * -1 }}
        />
      )}
      {isChildString ? (
        <HeaderTitle
          style={{
            color: colors.onBrand,
            textAlign: isIOS() ? 'center' : 'auto',
            flex: 1,
            paddingStart: !isIOS() ? baseSize(4) : undefined,
            marginEnd: isIOS() ? CLOSE_BUTTON_SIZE - gutter : undefined,
          }}
          ellipsizeMode="middle"
          numberOfLines={1}
        >
          {children}
        </HeaderTitle>
      ) : (
        children
      )}
    </View>
  )
}

const componentStyles = StyleSheet.create({
  modalHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.brand,
  },
})
