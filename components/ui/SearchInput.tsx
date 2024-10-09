import { useState, forwardRef, LegacyRef } from 'react'
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
import { baseFontSize, theme, baseSize } from '../../styles/'

type SearchInputProps = TextInputProps & {
  onCancel: () => void
}

const iOSClearIconColor = '#8e8d92'
const iOSIconColor = '#a7a6a9'
const iOSClearIconSize = baseSize(5)
const androidIconSize = baseSize(6)
const iOSClearEnd = baseSize(2)
const iOSTextFromClearPadding = baseSize(2)
const iOSPaddingEnd = iOSClearIconSize + iOSClearEnd + iOSTextFromClearPadding
const iOSSearchIconStart = baseSize(2)
const iOSSearchIconPadding = baseSize(2)
const iOSSearchIconSize = 18
const iOSPaddingStart =
  iOSSearchIconSize + iOSSearchIconStart + iOSSearchIconPadding
const androidClearEnd = 0
const androidPaddingEnd = 0
const androidPaddingStart = 0
const backButtonSize = baseSize(10)
const backButtonIconSize = isAndroid() ? 24 : 20
const backButtonOffset = ((backButtonSize - backButtonIconSize) / 2) * -1

const SearchInput = forwardRef(function SearchInput(
  { onChangeText, onCancel, ...props }: SearchInputProps,
  ref
) {
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
          rippleColor={theme.colors.rippleOnBrand}
          style={componentStyles.backButton}
          onPress={exitSearch}
        >
          {isAndroid() ? (
            <PlatformAdaptiveIcon
              name="back"
              isPlatformAdaptive={false}
              color={theme.colors.onBrand}
              size={backButtonIconSize}
            />
          ) : (
            <PlatformAdaptiveIcon
              name="x"
              isPlatformAdaptive={false}
              color={theme.colors.onBrand}
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
          cursorColor={theme.colors.onBrand}
          onChangeText={onChangeTextHandler}
          placeholderTextColor={
            isAndroid() ? theme.colors.onBrandSecondary : undefined
          }
          ref={ref as LegacyRef<TextInput>}
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
                color={isAndroid() ? theme.colors.onBrand : iOSClearIconColor}
              />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  )
})

const componentStyles = StyleSheet.create({
  input: {
    width: '100%',
    borderColor: theme.colors.light.divider,
    borderWidth: isAndroid() ? undefined : 1,
    color: isAndroid() ? theme.colors.onBrand : undefined,
    borderRadius: isAndroid() ? undefined : theme.defaultRadius / 2,
    backgroundColor: isAndroid() ? undefined : theme.colors.light.background,
    paddingEnd: isIOS() ? iOSPaddingEnd : androidPaddingEnd,
    paddingStart: isIOS() ? iOSPaddingStart : androidPaddingStart,
    paddingVertical: baseSize(2),
    ...baseFontSize(),
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
    gap: baseSize(3),
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
