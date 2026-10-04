import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../theme/tokens';
import { LightPhase } from '../types';

const dots: { phase: LightPhase; color: string }[] = [
  { phase: 'red', color: colors.red },
  { phase: 'yellow', color: colors.amber },
  { phase: 'green', color: colors.green },
];

export function TrafficLightBadge({ phase }: { phase: LightPhase }) {
  return (
    <View style={s.body}>
      {dots.map((d) => (
        <View
          key={d.phase}
          style={[s.dot, { backgroundColor: d.color, opacity: d.phase === phase ? 1 : 0.45 }]}
        />
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  body: {
    width: 16, paddingVertical: 4, gap: 3, alignItems: 'center',
    borderRadius: 8, backgroundColor: '#0D100E',
  },
  dot: { width: 7, height: 7, borderRadius: 3.5 },
});