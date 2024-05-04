import { View, StyleSheet, Button } from 'react-native'
import { useWindowSizePercentage } from '../../../utils'

function History() {
  const paddingBottom = useWindowSizePercentage(3, 'height')

  return (
    <View style={[componentStyles.container, { paddingBottom }]}>
      <Button title="History" />
    </View>
  )
}

const componentStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
})

export default History
