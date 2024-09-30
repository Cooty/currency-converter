import theme from './theme'

/**
 * Calculates sizing for gutters, spacing, etc, based on the
 * "base size" of the application, this ensures that every size we use
 * is a multiple of the "base size".
 *
 * @param multiple **Optional.** This will be the number to multiply the base size with. If omitted, defaults to `1`.
 * @returns
 */
export function baseSize(multiple = 1) {
  return theme.baseSize * multiple
}

/**
 * Returns a `fontSize` and **optionally** a `lineHeight` in an object based on the `baseFontSize` and `baseLineHeight`.
 * The `fontSize` will be calculated based on the `increment` argument and the `baseFontSize` The `lineHeight` will be calculated using `baseLineHeightRatio`.
 *
 * @param increments **Optional.** This will be the number to multiply `fontSizeIncrement` that will be added to `baseFontSize`, if omitted (or `0`) it will return the `baseFontSize` . You can also pass in a **negative number**, it will subtract from the `baseFontSize`, but we have also have `minFontSize` defined in our theme, if the resulting value is lower than that, the function will **throw an error**!
 * @param withLineHeight **Optional.** If set to `true`, the function will return a calculated `lineHeight` based on the calculated font-size and the `baseLineHeightRatio` from the theme.
 */
export function baseFontSize(increments = 0, withLineHeight = false) {
  const fontSize = theme.baseFontSize + increments * theme.fontSizeIncrement
  if (fontSize < theme.minFontSize) {
    throw new Error(
      `The font size is too small! The minimum font-size to be used in the application is ${theme.minFontSize}.`
    )
  }

  if (!withLineHeight) {
    return { fontSize }
  }

  const lineHeight = fontSize * theme.baseLineHeightRatio

  return {
    fontSize,
    lineHeight,
  }
}
