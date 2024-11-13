import { useState } from 'react'
import { View, Platform, StyleSheet } from 'react-native'
import { RadioGroupProps } from './types'
import { RadioButton } from './radio-button'
import { baseSize, theme, wrapperGutter } from '../../styles'

export function RadioGroup({
  options,
  initialValue,
  onChange,
  style,
}: RadioGroupProps) {
  const [selectedValue, setSelectedValue] = useState(initialValue)

  return (
    <View style={[componentStyles.container, style]}>
      {options.map(({ label, value, hint }, i) => (
        <View
          style={[
            componentStyles.itemRow,
            i === options.length - 1 && { borderBottomWidth: 0 },
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
        borderColor: theme.colors.light.divider,
        borderRadius: theme.defaultRadius,
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
        borderColor: theme.colors.light.divider,
        paddingHorizontal: wrapperGutter,
        paddingVertical: baseSize(),
      },
    }),
  },
})
