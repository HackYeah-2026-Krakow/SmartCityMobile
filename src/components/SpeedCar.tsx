import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, numeric, radius } from '../theme/tokens';
import { ProgressRing } from './ProgressRing';

type Props = { speedKmh: number; progress: number };

export function SpeedCard({ speedKmh, progress }: Props) {
  return (
    <View style={s.card}>
      <View style={s.left}>
        <Text style={s.label}>RECOMMENDED SPEED</Text>
        <View style={s.speedRow}>
          <Text style={[s.speed, numeric]} accessibilityLabel={`${speedKmh} kilometres per hour`}>
            {speedKmh}
          </Text>
          <Text style={s.unit}>km/h</Text>
        </View>
        <Text style={s.hint}>Stay at this pace to reach the next green phase</Text>
      </View>
      <View style={s.right}>
        <ProgressRing percent={progress} />
        <Text style={s.ringLabel}>Green wave{'\n'}progress</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg, borderWidth: 1.5, borderColor: colors.borderGlow,
    paddingVertical: 22, paddingLeft: 26, paddingRight: 20,
    shadowColor: colors.green, shadowOpacity: 0.28, shadowRadius: 22,
    shadowOffset: { width: 0, height: 0 }, elevation: 10,
  },
  left: { flex: 1, paddingRight: 8 },
  label: { color: colors.textMuted, fontSize: 13, fontWeight: '600', letterSpacing: 1.4 },
  speedRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: 2 },
  speed: { color: colors.green, fontSize: 88, lineHeight: 96, fontWeight: '800', letterSpacing: -3 },
  unit: { color: colors.text, fontSize: 24, fontWeight: '600', marginLeft: 10 },
  hint: { color: colors.textMuted, fontSize: 15, lineHeight: 22, marginTop: 2 },
  right: { alignItems: 'center' },
  ringLabel: { color: colors.textMuted, fontSize: 13, textAlign: 'center', marginTop: 10, lineHeight: 18 },
});
