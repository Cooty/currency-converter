# Styling of the application

Here you can find some reusable styes and utilities related to styling.

Exports of each new file should be also reexported from the barrel file (`index.ts`) as named exports,
tis way we van import components from the folder directly.

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
