import { defineConfig } from '@lingui/cli'

// IMPORTANT: This import path needs to be direct, don't load it through
// a barrel-file, because then it may include code that calls one of the
// lingui macros and that will trigger an error in the lingui commands
// Any file that is evaluated during config loading must be pure Node-compatible JavaScript.
import { defaultLocale, supportedLocales } from './features/i18n'

export default defineConfig({
  sourceLocale: defaultLocale,
  locales: supportedLocales,
  catalogs: [
    {
      path: '<rootDir>/features/i18n/locales/{locale}',
      include: ['<rootDir>'],
      exclude: ['**/node_modules/**'],
    },
  ],
})
