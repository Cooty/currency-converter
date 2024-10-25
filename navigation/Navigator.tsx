import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { PlatformAdaptiveIcon } from '../components/ui/'
import ConvertScreen from '../screens/convert/ConvertScreen'
import FavoritesScreen from '../screens/favorites/FavoritesScreen'
import SettingsScreen from '../screens/settings/SettingsScreen'
import { theme } from '../styles/'
import { RootTabsParamList } from './types'
import { useDefaultCurrencyCodes } from '../services/currency'

const Tab = createBottomTabNavigator<RootTabsParamList>()

function Navigator() {
  const defaultCurrencyCodes = useDefaultCurrencyCodes()

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Convert"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.brand,
          },
          headerTitleStyle: {
            color: theme.colors.onBrand,
          },
          tabBarActiveTintColor: theme.colors.brand,
          tabBarInactiveTintColor: theme.colors.light.textSecondary,
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

export default Navigator
