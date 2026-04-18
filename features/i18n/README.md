# Internationalization

We use [Lingui](https://lingui.dev/) to handle localization. We also utilize [Expo's localization](https://docs.expo.dev/versions/latest/sdk/localization/) module to check the installed languages on the user's device.

But we don't use the config plugin to create the native language selection for the app (where you set the language in Settings -> My App Name), instead we have our own language switch UI.

## Translating currency names

The full names of currencies are only sent in English via the API, but we also want to translate these.
For this we use the `./scripts/get-currency-name-translations.js` Node.js script that fetches the list of supported currencies and creates a list of translated names using a [machine translation service](https://www.deepl.com/).

To invoke the script that downloads all the flags, run this command:

```bash
node --env-file=.env features/i18n/scripts/get-currency-name-translations.js
```

**Important:** The API key for _DeepL_ must be present as an environment variable in the `.env` file (or from wherever the script gets it's env vars) by the name of `TRANSLATION_API_KEY`.

## TODO:

Currently the call to get the list of currencies was run against the host of https://freecurrencyapi.com/, so the free version, if one day we also want to download the [extended currency list](https://currencyapi.com/docs/currency-list) for the premium API, we'll need to run it against https://currencyapi.com/.

You can change the api host by passing the `host` argument

```bash
node --env-file=.env features/i18n/scripts/get-currency-name-translations.js host=http://example.com
```

You can also change the API's version by passing `v={n}`

```bash
node --env-file=.env features/i18n/scripts/get-currency-name-translations.js host=http://example.com v=3
```
