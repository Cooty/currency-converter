import { useEffect, useState } from 'react'
import {
  View,
  ViewProps,
  StyleSheet,
  PlatformColor,
  ColorValue,
} from 'react-native'

import { AppText } from './app-text'
import { Highlight } from './highlight'
import { tokens, baseSize } from '../styles'
import { isAndroid, isIOS } from '../utils'
import { useTheme, colors } from '../features/theming'

export interface SegmentedControlOption {
  label: string
  value: string
}

export type SegmentedControlProps = ViewProps & {
  initialValue?: string
  onChange?: (value: string) => void
  options: SegmentedControlOption[]
}

const iOSLinkColor = PlatformColor('link')

function getTextColor(
  selected: boolean,
  activeColor: ColorValue,
  iOSBaseColor: ColorValue,
  themeTextColor: ColorValue
) {
  if (!selected && isIOS()) {
    return iOSBaseColor
  }

  if (selected) {
    return activeColor
  }

  if (isAndroid() && !selected) {
    return themeTextColor
  }
  return undefined
}

const selectedBackgroundColor = isIOS() ? iOSLinkColor : colors.brand

export function SegmentedControl({
  initialValue,
  onChange,
  style,
  options,
  ...props
}: SegmentedControlProps) {
  const { theme, themeName } = useTheme()
  const [value, setValue] = useState(initialValue)
  const borderColor = isIOS() ? iOSLinkColor : theme.divider

  useEffect(() => {
    if (value && onChange) {
      onChange(value)
    }
  }, [value])

  return (
    <View
      style={[componentStyles.container, { borderColor }, style]}
      {...props}
    >
      {options.map((option, i) => {
        const selected = option.value === value
        const isLast = i === options.length - 1

        return (
          <View
            key={option.value}
            style={[
              componentStyles.item,
              {
                borderRightWidth: isLast ? undefined : 1,
                borderColor,
                backgroundColor: selected ? selectedBackgroundColor : undefined,
              },
            ]}
          >
            <Highlight
              style={componentStyles.activeSurface}
              onPress={selected ? undefined : () => setValue(option.value)}
            >
              <AppText
                numberOfLines={1}
                ellipsizeMode="middle"
                style={{
                  color: getTextColor(
                    selected,
                    isAndroid() ? colors.onBrand : colors.white,
                    iOSLinkColor,
                    theme.text
                  ),
                }}
              >
                {option.label}
              </AppText>
            </Highlight>
          </View>
        )
      })}
    </View>
  )
}

const componentStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: isAndroid() ? tokens.defaultRadius * 2 : 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  item: {
    height: isAndroid() ? tokens.androidMinTapArea : tokens.iosMinTapArea,
    borderWidth: 1,
    flex: 1,
  },
  activeSurface: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: baseSize(4),
  },
})
