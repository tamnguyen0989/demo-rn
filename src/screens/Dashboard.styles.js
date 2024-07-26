import { StyleSheet } from "react-native";

import { spacing } from "../utils/spacings";
import { colors } from "../utils/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: spacing.md,
  },
  chartWrapper: {},
  buttonsGroup: {
    position: "absolute",
    bottom: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    fontSize: 50,
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: colors.bg.primary,
    padding: spacing.sm,
  },
  buttonWrapperFirst: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: colors.bg.primary,
    padding: spacing.sm,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
  },
  buttonWrapperLast: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: colors.bg.primary,
    padding: spacing.sm,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
});
