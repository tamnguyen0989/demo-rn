import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { Button, TextInput, ActivityIndicator } from 'react-native-paper';

import { Spacer } from '../component/spacer.component';
import { SafeArea } from '../component/safe-area.component';
import { styles } from './Login.styles';
import { AuthenticationContext } from '../services/authentication.context';
import { Typography } from '../component/typography.component';
import { colors } from '../utils/colors';
import { EMAIL, PASS } from '../setup/firebase.setup';

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState(EMAIL);
  const [password, setPassword] = useState(PASS);
  const { onLogin, error, isLoading } = useContext(AuthenticationContext);

  const navigateAfterLogin = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <SafeArea>
      {isLoading && (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator>
            style={styles.activityIndicator}
            size={50}
            animating={true}
            color={colors.bg.primary}
          </ActivityIndicator>
        </View>
      )}
      <View style={styles.accountBackground}>
        <View style={styles.accountContainer}>
          <TextInput
            style={styles.authInput}
            label='E-mail'
            value={email}
            textContentType='emailAddress'
            keyboardType='email-address'
            autoCapitalize='none'
            activeUnderlineColor={colors.bg.primary}
            onChangeText={(u) => setEmail(u)}
          />
          <Spacer position='top' size='large'>
            <TextInput
              style={styles.authInput}
              label='Password'
              value={password}
              textContentType='password'
              secureTextEntry
              autoCapitalize='none'
              secure
              activeUnderlineColor={colors.bg.primary}
              onChangeText={(p) => setPassword(p)}
            />
          </Spacer>
          {error && (
            <Spacer position='top' size='medium'>
              <Typography variant='error'>{error}</Typography>
            </Spacer>
          )}
          <Spacer position='top' size='large'>
            <Button
              style={styles.authButton}
              icon='lock-open-outline'
              mode='contained'
              disabled={isLoading ? true : false}
              onPress={() => onLogin(email, password, navigateAfterLogin)}
            >
              {isLoading ? (
                <ActivityIndicator>
                  style={styles.activityIndicator}
                  size={50}
                  animating={true}
                  color={colors.bg.primary}
                </ActivityIndicator>
              ) : (
                'Login'
              )}
            </Button>
          </Spacer>
        </View>
      </View>
    </SafeArea>
  );
};
