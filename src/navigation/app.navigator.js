import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/Login.screen';
import { DashboardScreen } from '../screens/Dashboard.screen';
import { CameraPhotoScreen } from '../screens/CameraPhoto.screen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Dashboard'
          component={DashboardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='CameraPhoto'
          component={CameraPhotoScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
