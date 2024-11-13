import { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

export interface RadioButtonProps {
  label?: ReactNode
  hint?: ReactNode
  value: string
  checked?: boolean
  onChecked: (value: string) => void
}

export interface RadioGroupProps {
  options: Omit<RadioButtonProps, 'onChecked'>[]
  initialValue?: string
  onChange: (value: string) => void
  style?: StyleProp<ViewStyle>
}
