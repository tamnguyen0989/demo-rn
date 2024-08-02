import { Platform, StyleSheet } from 'react-native'
import { colors } from '../utils/colors'
import { spacing } from '../utils/spacings'

export const styles = StyleSheet.create({
  accountBackground: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  accountContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
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
  logoWrapper: {
    flex: 0.3,
    padding: 30,
    width: '100%',
    maxWidth: Platform.OS === 'web' ? '768px' : 'unset',
    alignItems: 'center',
  },
  logo: {
    flex: 1,
    resizeMode: 'contain',
    width: '100%',
    maxWidth: Platform.OS === 'web' ? '350px' : 'unset',
  },
})
