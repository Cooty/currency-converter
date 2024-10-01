import {
  ButtonProps,
  PlatformColor,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { PropsWithChildren } from 'react'
import Highlight from './Highlight'
import { isAndroid, isIOS } from '../../utils'
import { baseFontSize, theme } from '../../styles/'
import { IconNames, PlatformAdaptiveIcon } from './PlatformAdaptiveIcon'

type PlatformAdaptiveButtonProps = Omit<ButtonProps, 'title' | 'color'> & {
  variant?: 'text' | 'primary' | 'secondary'
  icon?: IconNames
  elevated?: boolean
} & PropsWithChildren

const IOS_SECONDARY_COLOR = '#dfebff'

function PlatformAdaptiveButton({
  variant = 'primary',
  onPress,
  children,
  icon,
  elevated = false,
}: PlatformAdaptiveButtonProps) {
  const primaryBackgroundColor = isIOS()
    ? PlatformColor('link')
    : theme.colors.brand
  const secondaryBackgroundColor = isIOS() ? IOS_SECONDARY_COLOR : undefined
  const primaryTextColor = isIOS() ? theme.colors.white : theme.colors.onBrand
  const primaryVariantColor = isIOS()
    ? PlatformColor('link')
    : theme.colors.brand
  const textColor =
    variant === 'primary' ? primaryTextColor : primaryVariantColor
  const IOS_HORIZONTAL_GUTTER = 16
  const ANDROID_HORIZONTAL_GUTTER = 24
  const IOS_HORIZONTAL_ICON_GUTTER = icon ? 12 : IOS_HORIZONTAL_GUTTER
  const ANDROID_HORIZONTAL_ICON_GUTTER = icon ? 12 : ANDROID_HORIZONTAL_GUTTER
  const ICON_SIZE = 18
  const androidSecondaryBorderColor = theme.colors.brand

  let backgroundColor = undefined

  if (variant === 'primary') {
    backgroundColor = primaryBackgroundColor
  } else {
    backgroundColor = secondaryBackgroundColor
  }

  return (
    <View
      style={[
        componentStyles.wrapper,
        {
          elevation: elevated && variant !== 'text' ? 3 : undefined,
          borderColor: !isIOS() && elevated ? 'rgba(0, 0, 0, 0)' : undefined,
          borderWidth: !isIOS() && elevated ? 1 : undefined,
        },
      ]}
    >
      <Highlight
        onPress={onPress}
        style={[
          componentStyles.buttonFrame,
          {
            backgroundColor,
            paddingEnd: isIOS()
              ? IOS_HORIZONTAL_GUTTER
              : ANDROID_HORIZONTAL_GUTTER,
            paddingStart: isIOS()
              ? IOS_HORIZONTAL_ICON_GUTTER
              : ANDROID_HORIZONTAL_ICON_GUTTER,
            borderWidth: isAndroid() && variant === 'secondary' ? 1 : undefined,
            borderColor:
              isAndroid() && variant === 'secondary'
                ? androidSecondaryBorderColor
                : undefined,
          },
        ]}
        rippleColor={
          variant === 'primary'
            ? theme.colors.rippleOnBrand
            : theme.colors.brandAlpha
        }
        activeOpacity={0.7}
      >
        {icon && (
          <PlatformAdaptiveIcon
            name={icon}
            size={ICON_SIZE}
            color={textColor as string}
          />
        )}
        <Text
          style={[
            componentStyles.text,
            {
              color: textColor,
            },
          ]}
        >
          {children}
        </Text>
      </Highlight>
    </View>
  )
}

const textFontSize = isIOS() ? baseFontSize(1) : baseFontSize()

const componentStyles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    borderRadius: 40,
    width: '100%',
  },
  buttonFrame: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    gap: isIOS() ? 4 : 8,
  },
  text: {
    fontWeight: isIOS() ? 400 : 500,
    textAlign: 'center',
    ...textFontSize,
  },
})

export default PlatformAdaptiveButton
