import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../theme/tokens';

/** Glowing route. Layered views fake the glow so it looks the same on iOS and Android. */
export function RouteLine({ left }: { left: `${number}%` }) {
  return (
    <View pointerEvents="none" style={[s.wrap, { left }]}>
      <View style={[s.layer, { width: 30, opacity: 0.06 }]} />
      <View style={[s.layer, { width: 20, opacity: 0.12 }]} />
      <View style={[s.layer, { width: 12, opacity: 0.22 }]} />
      <View style={[s.layer, { width: 6, opacity: 1 }]} />
    </View>
  );
}

export function RouteNode() {
  return <View style={s.node} />;
}

const s = StyleSheet.create({
  wrap: { position: 'absolute', top: 0, bottom: 0, width: 0, alignItems: 'center' },
  layer: {
    position: 'absolute', top: 0, bottom: 0,
    borderRadius: 15, backgroundColor: colors.green,
  },
  node: {
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: '#050706', borderWidth: 3, borderColor: colors.green,
  },
});
