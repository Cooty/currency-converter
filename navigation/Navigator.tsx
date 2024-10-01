import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { PlatformAdaptiveIcon } from '../components/ui/PlatformAdaptiveIcon'
import ConvertScreen from '../screens/convert/ConvertScreen'
import FavoritesScreen from '../screens/favorites/FavoritesScreen'
import SettingsScreen from '../screens/settings/SettingsScreen'

import routes from './routes'
import { theme } from '../styles/'

const Tab = createBottomTabNavigator()

function Navigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={routes.CONVERT}
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
          name={routes.CONVERT}
          component={ConvertScreen}
          options={{
            tabBarLabel: 'Convert',
            headerTitle: 'Convert currencies',
            tabBarIcon: ({ color, size }) => (
              <PlatformAdaptiveIcon name="convert" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={routes.FAVORITES}
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
          name={routes.SETTINGS}
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
