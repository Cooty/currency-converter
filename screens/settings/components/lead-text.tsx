import { ReactNode } from 'react'
import { StyleSheet, StyleProp, TextStyle } from 'react-native'
import { AppText } from '../../../components'
import { baseSize } from '../../../styles'

interface LeadTextProps {
  children?: ReactNode
  style?: StyleProp<TextStyle>
}

export function LeadText({ children, style }: LeadTextProps) {
  return (
    <AppText
      style={[componentStyles.verticalSpacing, style]}
      variant="secondary"
    >
      {children}
    </AppText>
  )
}

const componentStyles = StyleSheet.create({
  verticalSpacing: {
    marginBottom: baseSize(2),
  },
})
