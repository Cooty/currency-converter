import { View, Text, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Setting screen</Text>
      <StatusBar style="light" />
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

export default SettingsScreen
