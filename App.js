import { StyleSheet } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

import { AppNavigator } from './src/navigation/app.navigator';
import { AuthenticationContextProvider } from './src/services/authentication.context';

export default function App() {
  return (
    <>
      <AuthenticationContextProvider>
        <AppNavigator />
      </AuthenticationContextProvider>
      <ExpoStatusBar style='auto' />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
