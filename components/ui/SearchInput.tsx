import { useState, FC } from 'react'
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  Button,
  View,
  Pressable,
} from 'react-native'
import { MaterialIcons, Fontisto, AntDesign } from '@expo/vector-icons'
import { isAndroid, isIOS } from '../../utils'
import styles from '../../config/styles'

type SearchInputProps = TextInputProps & {
  onCancel: () => void
}

const iOSBackground = '#e5e4e9'
const iOSClearIconColor = '#8e8d92'
const androidIconColor = styles.colors.light.textSecondary
const iOSIconColor = '#a7a6a9'
const iOSClearIconSize = styles.baseSize * 5
const androidIconSize = styles.baseSize * 6
const iOSClearEnd = styles.baseSize * 2
const iOSTextFromClearPadding = styles.baseSize * 2
const iOSPaddingEnd = iOSClearIconSize + iOSClearEnd + iOSTextFromClearPadding
const iOSSearchIconStart = styles.baseSize * 2
const iOSSearchIconPadding = styles.baseSize * 2
const iOSSearchIconSize = 18
const iOSPaddingStart =
  iOSSearchIconSize + iOSSearchIconStart + iOSSearchIconPadding
const androidBorderRadius = styles.defaultRadius * 2
const androidClearEnd = androidBorderRadius / 2
const androidPaddingEnd =
  androidClearEnd + androidIconSize + styles.baseSize * 3
const androidIconStart = styles.baseSize * 3
const androidPaddingStart =
  androidIconStart + androidIconSize + styles.baseSize * 2

const SearchInput: FC<SearchInputProps> = ({
  onChangeText,
  onCancel,
  ...props
}) => {
  const [hasValue, setHasValue] = useState(props.value ? true : false)
  const onChangeTextHandler = (text: string) => {
    if (onChangeText) {
      onChangeText(text)
    }
    if (text.length) {
      setHasValue(true)
    } else {
      setHasValue(false)
    }
  }
  const onClearHandler = () => {
    if (onChangeText) {
      onChangeText('')
      setHasValue(false)
    }
  }

  const exitSearch = () => {
    onCancel()
    onClearHandler()
  }

  return (
    <View style={componentStyles.iOSCancelButtonContainer}>
      <View style={componentStyles.iconContainer}>
        {isIOS() && (
          <View
            style={[
              componentStyles.iconContainerHelper,
              componentStyles.iOSSearchIconContainer,
            ]}
          >
            <Fontisto
              name="search"
              size={iOSSearchIconSize}
              color={iOSIconColor}
            />
          </View>
        )}
        {isAndroid() && (
          <View
            style={[
              componentStyles.iconContainerHelper,
              componentStyles.androidStartIconsContainer,
            ]}
          >
            {hasValue ? (
              <Pressable onPress={exitSearch}>
                <MaterialIcons
                  name="arrow-back"
                  size={androidIconSize}
                  color={androidIconColor}
                />
              </Pressable>
            ) : (
              <MaterialIcons
                name="search"
                size={androidIconSize}
                color={androidIconColor}
              />
            )}
          </View>
        )}
        <TextInput
          {...props}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          returnKeyType="search"
          style={componentStyles.input}
          cursorColor={styles.colors.brand}
          onChangeText={onChangeTextHandler}
        />
        {isIOS() && hasValue && (
          <View
            style={[
              componentStyles.iconContainerHelper,
              componentStyles.iOSClearButtonContainer,
            ]}
          >
            <Pressable onPress={onClearHandler}>
              <AntDesign
                name="closecircle"
                size={iOSClearIconSize}
                color={iOSClearIconColor}
              />
            </Pressable>
          </View>
        )}
        {isAndroid() && hasValue && (
          <View
            style={[
              componentStyles.iconContainerHelper,
              componentStyles.androidClearButtonContainer,
            ]}
          >
            <Pressable onPress={onClearHandler}>
              <MaterialIcons
                name="close"
                size={androidIconSize}
                color={androidIconColor}
              />
            </Pressable>
          </View>
        )}
      </View>
      {isIOS() && hasValue && <Button title="Cancel" onPress={exitSearch} />}
    </View>
  )
}

const componentStyles = StyleSheet.create({
  input: {
    width: '100%',
    borderColor: isAndroid() ? styles.colors.light.divider : iOSBackground,
    borderWidth: 1,
    borderRadius: isAndroid() ? androidBorderRadius : styles.defaultRadius / 2,
    backgroundColor: isAndroid()
      ? styles.colors.light.background
      : iOSBackground,
    paddingEnd: isIOS() ? iOSPaddingEnd : androidPaddingEnd,
    paddingStart: isIOS() ? iOSPaddingStart : androidPaddingStart,
    paddingVertical: 8,
  },
  iOSCancelButtonContainer: {
    flexDirection: 'row',
    gap: styles.baseSize * 2,
    flexWrap: 'nowrap',
  },
  iconContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  iOSClearButtonContainer: {
    end: iOSClearEnd,
  },
  androidClearButtonContainer: {
    end: androidClearEnd,
  },
  iOSSearchIconContainer: {
    start: iOSSearchIconStart,
  },
  androidStartIconsContainer: {
    start: androidIconStart,
  },
  iconContainerHelper: {
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    zIndex: 2,
  },
})

export default SearchInput
