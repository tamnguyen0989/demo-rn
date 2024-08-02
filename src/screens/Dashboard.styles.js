import { Platform, StyleSheet } from 'react-native'

import { spacing } from '../utils/spacings'
import { colors } from '../utils/colors'
import { responsive } from '../utils/responsive'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.sm,
  },
  chartWrapper: {
    width: '100%',
    maxWidth: Platform.OS === 'web' ? '768px' : 'unset',
  },
  buttonGroupWrapper: { padding: spacing.sm, alignItems: 'center' },
  buttonsGroup: {
    position: 'absolute',
    bottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: Platform.OS === 'web' ? '768px' : 'unset',
    height: 55,
  },
  buttonsGroupWeb: {
    minWidth: responsive.desktop,
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colors.bg.primary,
    padding: spacing.sm,
    height: '100%',
    position: 'static',
    zIndex: 1,
  },
  buttonWrapperFirst: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colors.bg.primary,
    padding: spacing.sm,
    height: '100%',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    zIndex: 1,
  },
  buttonWrapperLast: {
    flex: 1.2,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colors.bg.primary,
    padding: spacing.sm,
    height: '100%',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    zIndex: 1,
  },
  indicatorChartWrapper: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    maxWidth: Platform.OS === 'web' ? '768px' : 'unset',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})
