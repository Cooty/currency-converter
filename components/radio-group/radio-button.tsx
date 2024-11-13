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
import { baseSize, theme, baseFontSize } from '../../styles'
import { isIOS } from '../../utils'

const TAP_AREA_SIZE = 40

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
            width: TAP_AREA_SIZE,
            height: TAP_AREA_SIZE,
            borderRadius: TAP_AREA_SIZE,
            overflow: 'hidden',
          }}
        >
          <Highlight
            style={componentStyles.indicatorContainer}
            rippleColor={theme.colors.brandAlpha}
            onPress={() => onChecked(value)}
          >
            <MaterialIcons
              name={checked ? 'radio-button-checked' : 'radio-button-unchecked'}
              color={theme.colors.brand}
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
    width: TAP_AREA_SIZE,
    height: TAP_AREA_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hint: {
    ...baseFontSize(-2, true),
  },
})
