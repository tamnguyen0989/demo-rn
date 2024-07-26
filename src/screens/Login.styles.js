import { StyleSheet } from "react-native";
import { colors } from "../utils/colors";
import { spacing } from "../utils/spacings";

export const styles = StyleSheet.create({
  accountBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  accountContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: spacing.lg,
    marginTop: spacing.md,
  },
  authButton: {
    color: colors.brand.primary,
    backgroundColor: colors.bg.primary,
  },
  authInput: {
    width: 300,
  },
  activityIndicator: {
    marginLeft: -25,
  },
});
