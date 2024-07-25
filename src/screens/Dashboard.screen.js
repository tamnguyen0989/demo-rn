import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import { SafeArea } from '../component/safe-area.component';
import { spacing } from '../utils/spacings';
import { colors } from '../utils/colors';
import { fontSizes } from '../utils/fonts';

export const DashboardScreen = () => {
  const [value, setValue] = useState('');

  const defaultStyleButton = {
    style: styles.button,
    checkedColor: colors.text.primary,
    uncheckedColor: colors.text.primary,
  };

  return (
    <SafeArea>
      <View style={styles.container}>
        <View style={styles.chartWrapper}>
          <Text>Chart</Text>
        </View>
        <View style={styles.buttonsWrapper}>
          <SegmentedButtons
            style={{ fontSize: 50 }}
            value={value}
            onValueChange={setValue}
            buttons={[
              {
                ...defaultStyleButton,
                value: 'camera',
                icon: 'camera',
              },
              {
                ...defaultStyleButton,
                value: 'train',
                label: 'Transit',
              },
              {
                ...defaultStyleButton,
                value: 'drive',
                label: 'Driving',
              },
              {
                ...defaultStyleButton,
                value: 'drive',
                label: 'Driving',
              },
              {
                ...defaultStyleButton,
                value: 'drive',
                label: 'Driving',
              },
            ]}
          />
        </View>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.md,
  },
  chartWrapper: {},
  buttonsWrapper: {
    position: 'absolute',
    bottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 50,
  },
  button: {
    backgroundColor: colors.bg.primary,
    borderColor: colors.bg.primary,
    height: 50,
    justifyContent: 'center',
  },
});
