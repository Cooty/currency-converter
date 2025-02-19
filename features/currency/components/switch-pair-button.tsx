import { View, Animated, StyleSheet, Platform } from 'react-native'
import { Highlight } from '../../../components'
import { baseSize, tokens } from '../../../styles'
import { colors } from '../../theming'
import { isIOS } from '../../../utils'
import { PlatformAdaptiveIcon } from '../../../components'
import { useState, useRef, useEffect } from 'react'

const animationConfig = { duration: 200, useNativeDriver: true }

export interface SwitchPairButtonProps {
  onSwitch: () => void
  variant?: 'vertical' | 'horizontal'
}

export function SwitchPairButton({
  onSwitch,
  variant = 'horizontal',
}: SwitchPairButtonProps) {
  const [isIconReversed, setIsIconReversed] = useState(false)

  const iconSpinAnimValue = useRef(new Animated.Value(0)).current
  const iconSpin = iconSpinAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange:
      variant === 'horizontal' ? ['90deg', '-90deg'] : ['0deg', '180deg'],
  })

  function animateIconForward() {
    Animated.timing(iconSpinAnimValue, {
      toValue: 1,
      ...animationConfig,
    }).start()
  }

  function animateIconBackwards() {
    Animated.timing(iconSpinAnimValue, {
      toValue: 0,
      ...animationConfig,
    }).start()
  }

  useEffect(() => {
    if (isIconReversed) {
      animateIconForward()
    } else {
      animateIconBackwards()
    }
  }, [isIconReversed])

  return (
    <View style={componentStyles.buttonContainer}>
      <View style={componentStyles.androidRippleCrop}>
        <Highlight
          onPress={() => {
            setIsIconReversed(!isIconReversed)
            onSwitch()
          }}
          style={componentStyles.switchCurrencyPairButton}
        >
          <Animated.View style={{ transform: [{ rotate: iconSpin }] }}>
            <PlatformAdaptiveIcon
              name="convert"
              color={isIOS() ? undefined : colors.onBrand}
              size={baseSize(6)}
            />
          </Animated.View>
        </Highlight>
      </View>
    </View>
  )
}

const SWITCH_CURRENCY_BUTTON_SIZE = isIOS()
  ? tokens.iosMinTapArea
  : tokens.androidMinTapArea
const BORDER_RADIUS = tokens.defaultRadius / 2

const componentStyles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
  },
  androidRippleCrop: {
    ...Platform.select({
      android: {
        width: SWITCH_CURRENCY_BUTTON_SIZE,
        height: SWITCH_CURRENCY_BUTTON_SIZE,
        overflow: 'hidden',
        borderRadius: BORDER_RADIUS,
      },
    }),
  },
  switchCurrencyPairButton: {
    backgroundColor: isIOS() ? 'rgba(0, 0, 0, 0)' : colors.brand,
    width: SWITCH_CURRENCY_BUTTON_SIZE,
    height: SWITCH_CURRENCY_BUTTON_SIZE,
    borderRadius: BORDER_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
