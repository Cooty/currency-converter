# Styling of the application

Here you can find some reusable styes and utilities related to styling.

Exports of each new file should be also reexported from the barrel file (`index.ts`) as named exports,
this way we can import components from the folder directly.

The app doesn't use any React Native UI library, we only rely on the built in styling capabilities of React Native.

Try to use `StyleSheets` whenever possible, only use inline-styles when you need dynamic styles.

By convention we name styles-sheets as `componentStyles` when defined in the components.
Alternatively you can place styles-sheets in separate files (if they would grow too big). For example `MyComponent.tsx` can have a `MyComponent.styles.ts` adjacent to it.

## Mixins

In `mixins.ts` we define style objects for our React Native components.

You can add them directly as values in a style object or you can spread them into a style object, similarly how you would use a [SASS mixin](https://sass-lang.com/documentation/at-rules/mixin/).

### Example

```ts
// MyComponent.tsx
import { StyleSheet } from 'react-native'
import { shadowMedium } from '../../styles/'

const componentStyles = StyleSheet.create({
  hasShadow: shadowMedium,
})
```

or

```ts
// MyComponent.tsx
import { StyleSheet } from 'react-native'
import { shadowMedium } from '../../styles/'

const componentStyles = StyleSheet.create({
  box: {
    padding: 10,
    background: 'white',
    ...shadowMedium,
  },
})
```
