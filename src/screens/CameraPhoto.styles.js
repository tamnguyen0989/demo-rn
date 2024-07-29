import { Platform, StyleSheet } from "react-native";
import { spacing } from "../utils/spacings";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraWrapper: {
    justifyContent: "center",
    width: 350,
    height: 500,
    paddingBottom: spacing.md,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: spacing.md,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: Platform.OS === "web" ? "768px" : "100%",
  },
  backWrapper: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginBottom: spacing.sm,
  },
  indicator: { justifyContent: "flex-end", width: "100%" },
});
