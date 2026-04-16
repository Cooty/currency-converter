import { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as NavigationBar from 'expo-navigation-bar'
import { useLingui } from '@lingui/react/macro'

import { PlatformAdaptiveIcon } from '../components'
import { ConvertScreen, FavoritesScreen, SettingsScreen } from '../screens'
import { colors, useTheme } from '../features/theming'
import { RootTabsParamList } from './types'
import { useDefaultCurrencyCodes } from '../features/currency'
import { isAndroid } from '../utils'

const Tab = createBottomTabNavigator<RootTabsParamList>()

export function RootTabs() {
  const defaultCurrencyCodes = useDefaultCurrencyCodes()
  const { theme, themeName } = useTheme()
  const { bottom } = useSafeAreaInsets()
  const { t } = useLingui()

  useEffect(() => {
    if (isAndroid()) {
      // Control how the bottom navigation bar looks like on Android
      // has no effect on iOS
      // https://docs.expo.dev/versions/latest/sdk/navigation-bar/
      NavigationBar.setStyle(themeName === 'light' ? 'dark' : 'light')
    }
  }, [themeName])

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Convert"
        screenOptions={{
          tabBarAllowFontScaling: true,
          animation: 'fade',
          headerStyle: {
            backgroundColor: colors.brand,
          },
          headerTitleStyle: {
            color: colors.onBrand,
          },
          tabBarActiveTintColor:
            themeName === 'light' ? colors.brand : theme.text,
          tabBarInactiveTintColor: theme.textSecondary,
          tabBarStyle: {
            backgroundColor: isAndroid()
              ? theme.androidTabBarBackground
              : theme.background,
            height: 70 + bottom,
            borderColor: isAndroid() ? 'rgba(0, 0, 0, 0)' : theme.divider,
          },
          tabBarItemStyle: {
            paddingTop: 10,
          },
        }}
      >
        <Tab.Screen
          name="Convert"
          component={ConvertScreen}
          initialParams={{
            baseCurrencyCode: defaultCurrencyCodes.base,
            targetCurrencyCode: defaultCurrencyCodes.target,
          }}
          options={{
            tabBarLabel: t`Convert`,
            headerTitle: t`Convert currencies`,
            tabBarIcon: ({ color, size }) => (
              <PlatformAdaptiveIcon name="convert" color={color} size={size} />
            ),
            tabBarHideOnKeyboard: true,
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            tabBarLabel: t`Favorites`,
            headerTitle: t`Favorite currency pairs`,
            tabBarIcon: ({ color, size }) => (
              <PlatformAdaptiveIcon name="favorite" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: t`Settings`,
            headerTitle: t`Settings`,
            tabBarIcon: ({ color, size }) => (
              <PlatformAdaptiveIcon name="settings" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
