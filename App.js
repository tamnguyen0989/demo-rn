import { StyleSheet } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

import { AppNavigator } from "./src/navigation/app.navigator";
import { AuthenticationContextProvider } from "./src/services/authentication.context";
import db, { initDatabase } from "./src/setup/sqlite.setup";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    initDatabase(db);
  }, []);

  return (
    <>
      <AuthenticationContextProvider>
        <AppNavigator />
      </AuthenticationContextProvider>
      <ExpoStatusBar style='auto' />
    </>
  );
}
