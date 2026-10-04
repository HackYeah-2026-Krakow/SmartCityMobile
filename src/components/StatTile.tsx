import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, numeric, radius } from '../theme/tokens';

type Props = { value: string; label: string; accent?: boolean };

export function StatTile({ value, label, accent }: Props) {
  return (
    <View style={s.tile}>
      <Text style={[s.value, numeric, accent && { color: colors.green }]}>{value}</Text>
      <Text style={s.label}>{label}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  tile: {
    flex: 1, backgroundColor: colors.surface, borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.border,
    paddingVertical: 14, paddingHorizontal: 18,
  },
  value: { color: colors.text, fontSize: 24, fontWeight: '700' },
  label: { color: colors.textFaint, fontSize: 15, marginTop: 2 },
});
