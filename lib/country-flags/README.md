Local "fork" of [react-native-country-flag](https://github.com/YannisHofmann/react-native-country-flag), the project was unmaintained and it also downloaded the flag image files from a remote server, which wasn't optimal.

[Decided](https://github.com/Cooty/currency-converter/issues/33) to just download the assets and clone the code to maintain compatibility avoid changes in my existing code.

To invoke the script that downloads all the flags, run this command:

```bash
node --env-file=.env lib/country-flags/scripts/get-country-flags.js
```

## TODO:

Currently the call to download the currency flags was run against the host of https://freecurrencyapi.com/, so the free version, if one day we also want to download the extended country list for the premium API, we'll need to run it against https://currencyapi.com/.

You can change the api host by passing the `host` argument

```bash
node --env-file=.env lib/country-flags/scripts/get-country-flags.js host=http://example.com
```

You can also change the API's version by passing `v={n}`

```bash
node --env-file=.env lib/country-flags/scripts/get-country-flags.js host=http://example.com v=3
```

**Note:** In that case we need to think of the logos for crypto currencies and assets (gold, silver, etc) too.
