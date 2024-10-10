# 🤑 Cross-platform Currency Converter Mobile Application

A simple currency converter for iOS and Android made with React Native.

The app uses [Free Currency Conversion API](https://freecurrencyapi.com/) as it's data source.

## 🍔 Tech stack

- [React Native](https://reactnative.dev/) (v74+)
- [Expo](https://expo.dev/) (SDK version 51+), we use fully managed workflow
- [TypeScript](https://www.typescriptlang.org/)
- [React Navigation](https://reactnavigation.org/) for routing

## 👷‍♀️ Local development

- You'll need to have [Node.js](https://nodejs.org/en) (v18+) installed plus you'll need to have your [environment setup](https://reactnative.dev/docs/set-up-your-environment) for running emulators. Alternatively you can use [Expo Go](https://expo.dev/go) on a physical device and connect to the development server running on your workstation.
- Install the project dependencies with `npm install`.
- Run `npm run start` and select on which platform do you want to start the emulator for. Alternatively you can run `npm run android` or `npm run ios`.

If you want the currency converter to actually work, you'll also need an API key for [Free Currency Conversion API](https://freecurrencyapi.com/). You can obtain this by registering an account on their website, then copy it from the dashboard and put it into a `.env` file. See `.env.example` for the variable name.

> ⚠️ **Important**: Never commit `.env` files into git, they are ignored for a reason!

Also in production we use a proxy for the API which adds the API key [on the backend](https://reactnative.dev/docs/security#storing-sensitive-info), this way we avoid compiling the API key into the release bundle.
