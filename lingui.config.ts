import { defineConfig } from '@lingui/cli'

export default defineConfig({
  sourceLocale: 'en',
  locales: ['bg', 'en', 'hu', 'de'],
  catalogs: [
    {
      path: '<rootDir>/locales/{locale}',
      include: ['<rootDir>'],
      exclude: ['**/node_modules/**'],
    },
  ],
})
