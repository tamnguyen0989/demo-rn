import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

export const SafeArea = ({ children }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: StatusBar.currentHeight
          ? `${StatusBar.currentHeight}px`
          : "0px",
      }}
    >
      {children}
    </SafeAreaView>
  );
};
