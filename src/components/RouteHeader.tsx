import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '../theme/tokens';

type Props = { from: string; to: string; onMenuPress?: () => void };

function Pin({ letter, filled }: { letter: string; filled?: boolean }) {
  return (
    <View style={[s.pin, filled && s.pinFilled]}>
      <Text style={[s.pinText, filled && { color: colors.bg }]}>{letter}</Text>
    </View>
  );
}

export function RouteHeader({ from, to, onMenuPress }: Props) {
  return (
    <View style={s.card}>
      <View style={{ flex: 1 }}>
        <View style={s.row}>
          <Pin letter="A" filled />
          <Text style={s.from} numberOfLines={1}>{from}</Text>
        </View>
        <View style={s.connector} />
        <View style={s.row}>
          <Pin letter="B" />
          <Text style={s.to} numberOfLines={1}>{to}</Text>
        </View>
      </View>
      <Pressable
        onPress={onMenuPress}
        accessibilityRole="button"
        accessibilityLabel="Open menu"
        style={({ pressed }) => [s.menu, pressed && { opacity: 0.7 }]}
      >
        {[0, 1, 2].map((i) => <View key={i} style={s.bar} />)}
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(22,26,24,0.94)',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  pin: {
    width: 26, height: 26, borderRadius: 13,
    borderWidth: 1.5, borderColor: colors.green,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  pinFilled: { backgroundColor: colors.green },
  pinText: { color: colors.green, fontSize: 12, fontWeight: '700' },
  connector: {
    width: 1.5, height: 10, marginLeft: 12.25,
    backgroundColor: colors.greenSoft,
  },
  from: { color: colors.textMuted, fontSize: 19, fontWeight: '500', flexShrink: 1 },
  to: { color: colors.text, fontSize: 19, fontWeight: '600', flexShrink: 1 },
  menu: {
    width: 54, height: 54, borderRadius: 27,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center', gap: 4,
    marginLeft: 12,
  },
  bar: { width: 18, height: 2, borderRadius: 1, backgroundColor: colors.textMuted },
});
