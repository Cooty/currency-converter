import { View, Text, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'

function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Text>Favorites screen</Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default FavoritesScreen
