import {
  Pressable,
  View,
  Platform,
  StyleSheet,
  PlatformColor,
} from 'react-native'
import { SymbolView } from 'expo-symbols'
import { MaterialIcons } from '@expo/vector-icons'
import { Highlight } from '../highlight'
import { AppText } from '../app-text'
import { YStack } from '../y-stack'
import { RadioButtonProps } from './types'
import { baseSize, baseFontSize } from '../../styles'
import { useTheme } from '../../features/theming'
import { colors } from '../../features/theming'
import { isIOS } from '../../utils'

const TAP_AREA_SIZE = 44
const TAP_AREA_SIZE_ANDROID = 48

function LabelAndHint({
  label,
  hint,
}: Pick<RadioButtonProps, 'label' | 'hint'>) {
  return (
    <YStack style={{ rowGap: 0, flex: 1 }}>
      <AppText>{label}</AppText>
      {hint && (
        <AppText variant="secondary" style={componentStyles.hint}>
          {hint}
        </AppText>
      )}
    </YStack>
  )
}

export function RadioButton({
  label,
  value,
  checked,
  onChecked,
  hint,
}: RadioButtonProps) {
  const { themeName, theme } = useTheme()

  if (isIOS()) {
    return (
      <Highlight
        style={componentStyles.container}
        onPress={() => onChecked(value)}
      >
        {label && <LabelAndHint label={label} hint={hint} />}
        <View style={componentStyles.indicatorContainer}>
          {checked && (
            <SymbolView
              name="checkmark"
              size={20}
              tintColor={PlatformColor('link') as unknown as string}
              resizeMode="scaleAspectFit"
            />
          )}
        </View>
      </Highlight>
    )
  } else {
    return (
      <Pressable
        onPress={() => onChecked(value)}
        style={componentStyles.container}
      >
        <View
          style={{
            width: TAP_AREA_SIZE_ANDROID,
            height: TAP_AREA_SIZE_ANDROID,
            borderRadius: TAP_AREA_SIZE_ANDROID,
            overflow: 'hidden',
          }}
        >
          <Highlight
            style={componentStyles.indicatorContainer}
            rippleColor={
              themeName === 'light'
                ? colors.brandAlpha
                : theme.rippleOnBackground
            }
            onPress={() => onChecked(value)}
          >
            <MaterialIcons
              name={checked ? 'radio-button-checked' : 'radio-button-unchecked'}
              color={themeName === 'light' ? colors.brand : theme.text}
              size={24}
            />
          </Highlight>
        </View>
        {label && <LabelAndHint label={label} hint={hint} />}
      </Pressable>
    )
  }
}

const componentStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        justifyContent: 'space-between',
      },
      android: {
        columnGap: baseSize(4),
      },
    }),
  },
  indicatorContainer: {
    ...Platform.select({
      ios: {
        width: TAP_AREA_SIZE,
        height: TAP_AREA_SIZE,
      },
      android: {
        width: TAP_AREA_SIZE_ANDROID,
        height: TAP_AREA_SIZE_ANDROID,
      },
    }),
    justifyContent: 'center',
    alignItems: 'center',
  },
  hint: {
    ...baseFontSize(-2, true),
  },
})
