import { useState } from 'react'
import { View, Pressable, StyleSheet, Button } from 'react-native'
import { AppText } from '../../../components/ui'

import { MaterialIcons } from '@expo/vector-icons'

import styles from '../../../config/styles'
import { isIOS } from '../../../utils'

const BUTTON_TEXT_COLOR = styles.colors.brand
const BUTTON_ICON_PRESSED_COLOR = styles.colors.light.red

function AddToFavorites() {
  const [isPressed, setIsPressed] = useState(false)
  const label = 'Add to favorites'

  return (
    <View style={componentStyles.buttonContainer}>
      {isIOS() ? (
        <Button title={label} />
      ) : (
        <Pressable
          style={({ pressed }) => {
            setIsPressed(pressed)
            return [componentStyles.button, { opacity: pressed ? 0.7 : 1 }]
          }}
        >
          <MaterialIcons
            name="favorite"
            color={isPressed ? BUTTON_ICON_PRESSED_COLOR : BUTTON_TEXT_COLOR}
            size={24}
          />
          <AppText style={componentStyles.buttonText}>{label}</AppText>
        </Pressable>
      )}
    </View>
  )
}

const componentStyles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: styles.baseSize * 2,
    padding: styles.baseSize * 2,
  },
  buttonText: {
    color: styles.colors.brand,
    fontSize: styles.buttonFontSize,
    fontWeight: styles.buttonFontWeight,
  },
})

export default AddToFavorites
