import { useState } from 'react'
import { View, Platform, StyleSheet } from 'react-native'
import { RadioGroupProps } from './types'
import { RadioButton } from './radio-button'
import { baseSize, tokens, wrapperGutter } from '../../styles'
import { useTheme } from '../../features/theming'

export function RadioGroup({
  options,
  initialValue,
  onChange,
  style,
}: RadioGroupProps) {
  const { theme } = useTheme()
  const [selectedValue, setSelectedValue] = useState(initialValue)

  return (
    <View
      style={[componentStyles.container, { borderColor: theme.divider }, style]}
    >
      {options.map(({ label, value, hint }, i) => (
        <View
          style={[
            componentStyles.itemRow,
            i === options.length - 1 && { borderBottomWidth: 0 },
            { borderColor: theme.divider },
          ]}
          key={value}
        >
          <RadioButton
            label={label}
            value={value}
            checked={selectedValue === value}
            hint={hint}
            onChecked={(value) => {
              setSelectedValue(value)
              onChange(value)
            }}
          />
        </View>
      ))}
    </View>
  )
}

const componentStyles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        borderWidth: 1,
        borderRadius: tokens.defaultRadius,
      },
      android: {
        rowGap: baseSize(),
      },
    }),
  },
  itemRow: {
    ...Platform.select({
      ios: {
        borderBottomWidth: 1,
        paddingHorizontal: wrapperGutter,
        paddingVertical: baseSize(),
      },
    }),
  },
})
