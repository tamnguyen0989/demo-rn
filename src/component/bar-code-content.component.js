import { View, Text, StyleSheet } from 'react-native'
import { ActivityIndicator, Card } from 'react-native-paper'
import { spacing } from '../utils/spacings'

export const BarCodeContent = ({ barcodeData, isLoadingBarcode }) => {
  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          {isLoadingBarcode ? (
            <ActivityIndicator />
          ) : !barcodeData?.uri?.length ? (
            <Text>Please scan the QR/Bardcode!</Text>
          ) : (
            <Text>{barcodeData.uri}</Text>
          )}
        </Card.Content>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.sm,
  },
})
