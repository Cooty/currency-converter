import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useEffect,
  useMemo,
} from 'react'
import { useColorScheme } from 'react-native'
import type { ThemeNames, ThemeOptions } from './types'
import { colors, ThemeType } from './colors'
import { DEFAULT_SETTING } from './constants'
import { saveThemeSetting, getSavedThemeSetting } from './utils'

interface ThemeContextValue {
  themeSetting: ThemeOptions
  themeName: ThemeNames
  theme: ThemeType
  setThemeSetting: (option: ThemeOptions) => void
  setThemeName: (option: ThemeNames) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  themeSetting: DEFAULT_SETTING,
  themeName: 'light',
  theme: colors.light,
  setThemeSetting: (_: ThemeOptions) => {},
  setThemeName: (_: ThemeNames) => {},
})

ThemeContext.displayName = 'ThemeContext'

export function useTheme() {
  return useContext(ThemeContext)
}

type ThemeProviderProps = PropsWithChildren & {
  onReady?: () => void
}

export function ThemeProvider({
  children,
  onReady,
  ...props
}: ThemeProviderProps) {
  // This is the value set by the user, it can also be "system"
  const [themeSetting, setThemeSetting] =
    useState<ThemeOptions>(DEFAULT_SETTING)
  // This is the actual name of the theme, it can only be "light" or "dark"
  const [themeName, setThemeName] = useState<ThemeNames>('light')
  const systemThemeSetting = useColorScheme()

  // Check theme on start up and set it
  useEffect(() => {
    async function setInitialTheme() {
      const savedThemeSetting = await getSavedThemeSetting()
      if (savedThemeSetting) {
        setThemeSetting(savedThemeSetting)
      } else {
        setThemeSetting('system')
      }
    }
    setInitialTheme().finally(() => {
      onReady?.()
    })
  }, [])

  // Check the users preferences when they are changed from the UI
  useEffect(() => {
    if (themeSetting === 'system' && systemThemeSetting) {
      if (systemThemeSetting === 'light' || systemThemeSetting === 'dark') {
        setThemeName(systemThemeSetting)
      } else {
        setThemeName('light')
      }
    } else {
      setThemeName(themeSetting as ThemeNames)
    }
    saveThemeSetting(themeSetting)
  }, [themeSetting])

  // Watch for changes in the system's settings
  useEffect(() => {
    if (
      (themeSetting === 'system' && systemThemeSetting === 'light') ||
      systemThemeSetting === 'dark'
    ) {
      setThemeName(systemThemeSetting)
    }
  }, [systemThemeSetting])

  const contextValue = useMemo(
    () => ({
      themeSetting,
      setThemeSetting,
      themeName,
      setThemeName,
      theme: colors[themeName],
    }),
    [themeName, themeSetting]
  )

  return (
    <ThemeContext value={contextValue} {...props}>
      {children}
    </ThemeContext>
  )
}
