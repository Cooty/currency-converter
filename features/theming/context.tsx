import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useEffect,
} from 'react'
import { useColorScheme } from 'react-native'
import type { ThemeNames, ThemeOptions } from './types'
import { colors, ThemeType } from './colors'
import { DEFAULT_SETTING } from './constants'
import {
  DEFAULT_SETTING as DEFAULT_THEME_SETTING,
  saveThemeSetting,
} from '../theming'

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
  const context = useContext(ThemeContext)
  return context
}

type ThemeProviderProps = PropsWithChildren & {
  initialThemeSetting?: ThemeOptions
}

export function ThemeProvider({
  children,
  initialThemeSetting,
}: ThemeProviderProps) {
  const [themeSetting, setThemeSetting] = useState(
    initialThemeSetting ?? DEFAULT_THEME_SETTING
  )
  const [themeName, setThemeName] = useState('light' as ThemeNames)
  const systemThemeSetting = useColorScheme()

  useEffect(() => {
    if (systemThemeSetting) {
      setThemeSetting(systemThemeSetting)
    }
  }, [systemThemeSetting])

  useEffect(() => {
    if (themeSetting === 'system' && systemThemeSetting) {
      setThemeName(systemThemeSetting)
    } else {
      setThemeName(themeSetting as ThemeNames)
    }
    saveThemeSetting(themeSetting)
  }, [themeSetting])

  return (
    <ThemeContext.Provider
      value={{
        themeSetting,
        setThemeSetting,
        themeName,
        setThemeName,
        theme: colors[themeName],
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
