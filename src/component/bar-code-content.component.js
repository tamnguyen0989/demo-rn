import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { spacing } from "../utils/spacings";

export const BarCodeContent = ({ barcodeData }) => {
  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          {!barcodeData?.uri?.length ? (
            <Text>Please scan the QR/Bardcode!</Text>
          ) : (
            <Text>{barcodeData.uri}</Text>
          )}
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.sm,
  },
});
