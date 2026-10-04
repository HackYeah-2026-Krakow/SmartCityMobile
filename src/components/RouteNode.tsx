import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../theme/tokens';

/** A traffic light stop on the route line. */
export function RouteNode() {
  return <View style={s.node} />;
}

const s = StyleSheet.create({
  node: {
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: '#050706', borderWidth: 3, borderColor: colors.green,
  },
});