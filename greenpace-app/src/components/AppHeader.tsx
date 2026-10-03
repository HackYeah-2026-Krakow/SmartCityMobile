import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors } from '../theme/colors';

export function AppHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.brand}>
        ● GREENPACE
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingBottom: 6,
  },

  brand: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
});
