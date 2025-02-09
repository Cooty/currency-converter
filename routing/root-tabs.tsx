import { NavigationContainer } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { PlatformAdaptiveIcon } from '../components'
import { ConvertScreen, FavoritesScreen, SettingsScreen } from '../screens'
import { colors, useTheme } from '../features/theming'
import { RootTabsParamList } from './types'
import { useDefaultCurrencyCodes } from '../features/currency'

const Tab = createBottomTabNavigator<RootTabsParamList>()

export function RootTabs() {
  const defaultCurrencyCodes = useDefaultCurrencyCodes()
  const { theme, themeName } = useTheme()
  const { bottom } = useSafeAreaInsets()

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
            backgroundColor: theme.background,
            height: 70 + bottom,
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
            tabBarLabel: 'Convert',
            headerTitle: 'Convert currencies',
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
            tabBarLabel: 'Favorites',
            headerTitle: 'Favorite currency pairs',
            tabBarIcon: ({ color, size }) => (
              <PlatformAdaptiveIcon name="favorite" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: 'Settings',
            headerTitle: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <PlatformAdaptiveIcon name="settings" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
