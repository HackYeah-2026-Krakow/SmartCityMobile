import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, numeric, radius } from '../theme/tokens';
import { LightPhase } from '../types';
import { TrafficLightBadge } from './TrafficLightBadge';

type Props = {
  distanceM: number;
  greenInS: number;
  phase: LightPhase;
  highlighted?: boolean;
};

export function LightCallout({ distanceM, greenInS, phase, highlighted }: Props) {
  return (
    <View style={[s.pill, highlighted && s.pillOn]}>
      <TrafficLightBadge phase={phase} />
      <Text style={[s.dist, numeric]}>{distanceM} m</Text>
      <View style={s.sep} />
      <Text style={[s.green, numeric]}>
        {greenInS === 0 ? 'Green now' : `Green in ${greenInS} s`}
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  pill: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingVertical: 11, paddingHorizontal: 14,
    backgroundColor: 'rgba(24,28,26,0.96)',
    borderRadius: radius.md, borderWidth: 1, borderColor: colors.border,
  },
  pillOn: {
    borderColor: colors.borderGlow,
    shadowColor: colors.green, shadowOpacity: 0.35, shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 }, elevation: 6,
  },
  dist: { color: colors.text, fontSize: 17, fontWeight: '700' },
  sep: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: colors.textFaint },
  green: { color: colors.green, fontSize: 17, fontWeight: '500' },
});