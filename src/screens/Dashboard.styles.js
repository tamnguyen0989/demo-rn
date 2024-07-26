import { Platform, StyleSheet } from "react-native";

import { spacing } from "../utils/spacings";
import { colors } from "../utils/colors";
import { responsive } from "../utils/responsive";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: spacing.md,
  },
  chartWrapper: {
    width: "100%",
    maxWidth: Platform.OS === "web" ? "768px" : "unset",
  },
  buttonsGroup: {
    position: "absolute",
    bottom: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    maxWidth: Platform.OS === "web" ? "768px" : "unset",
    height: 50,
  },
  buttonsGroupWeb: {
    minWidth: responsive.desktop,
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: colors.bg.primary,
    padding: spacing.sm,
    height: "100%",
  },
  buttonWrapperFirst: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: colors.bg.primary,
    padding: spacing.sm,
    height: "100%",
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
  },
  buttonWrapperLast: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: colors.bg.primary,
    padding: spacing.sm,
    height: "100%",
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
});
