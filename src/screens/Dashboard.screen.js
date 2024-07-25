import { View, Text, StyleSheet } from "react-native";

export const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <Text>DashboardScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
