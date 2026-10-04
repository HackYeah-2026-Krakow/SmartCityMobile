import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../theme/tokens';

/** Quiet street grid behind the route. Swap for a real map later. */
export function MapBackdrop() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {[0.2, 0.43, 0.66, 0.89].map((y) => (
        <View key={y} style={[s.h, { top: `${y * 100}%` }]} />
      ))}
      <View style={[s.v, { left: '74%' }]} />
    </View>
  );
}

const s = StyleSheet.create({
  h: { position: 'absolute', left: 0, right: 0, height: 22, backgroundColor: colors.road },
  v: { position: 'absolute', top: 0, bottom: 0, width: 22, backgroundColor: colors.road },
});