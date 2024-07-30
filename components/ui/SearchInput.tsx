import { useState, FC } from 'react'
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  View,
  Pressable,
} from 'react-native'
import { PlatformAdaptiveIcon } from './PlatformAdaptiveIcon'
import Highlight from './Highlight'
import { isAndroid, isIOS } from '../../utils'
import styles from '../../config/styles'

type SearchInputProps = TextInputProps & {
  onCancel: () => void
}

const iOSClearIconColor = '#8e8d92'
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
const androidClearEnd = 0
const androidPaddingEnd = 0
const androidPaddingStart = 0
const backButtonSize = styles.baseSize * 10
const backButtonIconSize = isAndroid() ? 24 : 20
const backButtonOffset = ((backButtonSize - backButtonIconSize) / 2) * -1

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
    <View style={componentStyles.outerContainer}>
      <View style={componentStyles.backButtonContainer}>
        <Highlight
          rippleColor={styles.colors.rippleOnBrand}
          style={componentStyles.backButton}
          onPress={exitSearch}
        >
          {isAndroid() ? (
            <PlatformAdaptiveIcon
              name="back"
              isPlatformAdaptive={false}
              color={styles.colors.onBrand}
              size={backButtonIconSize}
            />
          ) : (
            <PlatformAdaptiveIcon
              name="x"
              isPlatformAdaptive={false}
              color={styles.colors.onBrand}
              size={backButtonIconSize}
            />
          )}
        </Highlight>
      </View>
      <View style={componentStyles.inputWrapper}>
        {isIOS() && (
          <View
            style={[
              componentStyles.iconContainerHelper,
              componentStyles.iOSSearchIconContainer,
            ]}
          >
            <PlatformAdaptiveIcon
              name="search"
              size={iOSSearchIconSize}
              color={iOSIconColor}
            />
          </View>
        )}
        <TextInput
          {...props}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          returnKeyType="search"
          style={componentStyles.input}
          cursorColor={styles.colors.onBrand}
          onChangeText={onChangeTextHandler}
          placeholderTextColor={
            isAndroid() ? styles.colors.onBrandSecondary : undefined
          }
        />
        {hasValue && (
          <View
            style={[
              componentStyles.iconContainerHelper,
              componentStyles.clearButtonContainer,
            ]}
          >
            <Pressable onPress={onClearHandler}>
              <PlatformAdaptiveIcon
                name="close"
                size={isAndroid() ? androidIconSize : iOSClearIconSize}
                color={isAndroid() ? styles.colors.onBrand : iOSClearIconColor}
              />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  )
}

const componentStyles = StyleSheet.create({
  input: {
    width: '100%',
    borderColor: styles.colors.light.divider,
    borderWidth: isAndroid() ? undefined : 1,
    fontSize: isAndroid() ? styles.baseFontSize : undefined,
    color: isAndroid() ? styles.colors.onBrand : undefined,
    borderRadius: isAndroid() ? undefined : styles.defaultRadius / 2,
    backgroundColor: isAndroid() ? undefined : styles.colors.light.background,
    paddingEnd: isIOS() ? iOSPaddingEnd : androidPaddingEnd,
    paddingStart: isIOS() ? iOSPaddingStart : androidPaddingStart,
    paddingVertical: styles.baseSize * 2,
  },
  backButtonContainer: {
    borderRadius: backButtonSize,
    overflow: 'hidden',
    marginStart: isAndroid() ? backButtonOffset : undefined,
    marginEnd: isIOS() ? backButtonOffset : undefined,
  },
  backButton: {
    width: backButtonSize,
    height: backButtonSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerContainer: {
    flexDirection: isAndroid() ? 'row' : 'row-reverse',
    gap: styles.baseSize * 3,
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  clearButtonContainer: {
    end: isAndroid() ? androidClearEnd : iOSClearEnd,
  },
  iOSSearchIconContainer: {
    start: iOSSearchIconStart,
  },
  iconContainerHelper: {
    position: 'absolute',
    justifyContent: 'center',
    zIndex: 2,
  },
})

export default SearchInput
