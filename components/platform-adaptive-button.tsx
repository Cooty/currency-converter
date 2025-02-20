import {
  ButtonProps,
  PlatformColor,
  StyleSheet,
  Text,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native'
import { PropsWithChildren } from 'react'
import { Highlight } from './highlight'
import { isAndroid, isIOS } from '../utils'
import { baseFontSize, tokens } from '../styles'
import { colors } from '../features/theming'
import { useTheme } from '../features/theming'
import { IconNames, PlatformAdaptiveIcon } from './platform-adaptive-icon'

export type PlatformAdaptiveButtonProps = Omit<
  ButtonProps,
  'title' | 'color'
> & {
  variant?: 'text' | 'primary' | 'secondary'
  icon?: IconNames
  elevated?: boolean
  style?: StyleProp<ViewStyle>
  hug?: boolean
} & PropsWithChildren

const IOS_SECONDARY_COLOR = '#dfebff'
const ICON_SIZE = 18
const IOS_HORIZONTAL_GUTTER = 16
const ANDROID_HORIZONTAL_GUTTER = 24
const primaryBackgroundColor = isIOS() ? PlatformColor('link') : colors.brand

export function PlatformAdaptiveButton({
  variant = 'primary',
  onPress,
  children,
  icon,
  elevated = false,
  style,
  hug = false,
}: PlatformAdaptiveButtonProps) {
  const { themeName, theme } = useTheme()
  const secondaryBackgroundColor = isIOS() ? IOS_SECONDARY_COLOR : undefined
  const primaryTextColor = isIOS() ? colors.white : colors.onBrand
  const androidSecondaryTextColor =
    themeName === 'light' ? colors.brand : theme.text
  const secondaryTextColor = isIOS()
    ? PlatformColor('link')
    : androidSecondaryTextColor
  const textColor =
    variant === 'primary' ? primaryTextColor : secondaryTextColor
  const secondaryRippleColor =
    themeName === 'light' ? colors.brandAlpha : theme.rippleOnBackground

  const IOS_HORIZONTAL_ICON_GUTTER = icon ? 12 : IOS_HORIZONTAL_GUTTER
  const ANDROID_HORIZONTAL_ICON_GUTTER = icon ? 12 : ANDROID_HORIZONTAL_GUTTER

  const androidSecondaryBorderColor =
    themeName === 'light' ? colors.brand : theme.text

  let backgroundColor = undefined

  if (variant === 'primary') {
    backgroundColor = primaryBackgroundColor
  } else {
    backgroundColor = secondaryBackgroundColor
  }

  return (
    <View
      style={[
        {
          width: hug ? undefined : '100%',
          flexDirection: hug ? 'row' : 'column',
        },
        style,
      ]}
    >
      <View
        style={[
          componentStyles.wrapper,
          {
            elevation:
              isAndroid() && elevated && variant !== 'text' ? 3 : undefined,
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
              borderWidth:
                isAndroid() && variant === 'secondary' ? 1 : undefined,
              borderColor:
                isAndroid() && variant === 'secondary'
                  ? androidSecondaryBorderColor
                  : undefined,
            },
          ]}
          rippleColor={
            variant === 'primary' ? colors.rippleOnBrand : secondaryRippleColor
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
    </View>
  )
}

const textFontSize = isIOS() ? baseFontSize(1) : baseFontSize()

const BORDER_RADIUS = tokens.defaultRadius * 2

const componentStyles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    borderRadius: BORDER_RADIUS,
  },
  buttonFrame: {
    height: isIOS() ? tokens.iosMinTapArea : tokens.androidMinTapArea,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS,
    gap: isIOS() ? 4 : 8,
  },
  text: {
    fontWeight: isIOS() ? 400 : 500,
    textAlign: 'center',
    ...textFontSize,
  },
})
