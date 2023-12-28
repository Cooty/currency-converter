import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { MaterialIcons } from '@expo/vector-icons'

import ConvertScreen from '../screens/convert/ConvertScreen'
import FavoritesScreen from '../screens/favorites/FavoritesScreen'
import SettingsScreen from '../screens/settings/SettingsScreen'

import routes from './routes'
import styles from '../config/styles'

const Tab = createBottomTabNavigator()

function Navigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={routes.CONVERT}
        screenOptions={{
          headerStyle: {
            backgroundColor: styles.colors.brand,
          },
          headerTitleStyle: {
            color: styles.colors.onBrand,
          },
          tabBarActiveTintColor: styles.colors.brand,
          tabBarInactiveTintColor: styles.colors.light.disabled,
        }}
      >
        <Tab.Screen
          name={routes.CONVERT}
          component={ConvertScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="compare-arrows" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={routes.FAVORITES}
          component={FavoritesScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="favorite" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={routes.SETTINGS}
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="settings" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Navigator
