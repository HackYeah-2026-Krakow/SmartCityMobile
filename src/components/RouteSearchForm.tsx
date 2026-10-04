import React, { useRef, useState } from 'react';
import {
  ActivityIndicator, Keyboard, Pressable, StyleSheet, Text, TextInput, View,
} from 'react-native';
import { colors, radius } from '../theme/tokens';

type Props = {
  initialFrom?: string;
  initialTo?: string;
  loading?: boolean;
  error?: string | null;
  onSubmit: (from: string, to: string) => void;
};

const SAVED = ['Work', 'Home', 'Gym'];

function Pin({ letter, filled }: { letter: string; filled?: boolean }) {
  return (
    <View style={[s.pin, filled && { backgroundColor: colors.green }]}>
      <Text style={[s.pinText, filled && { color: colors.bg }]}>{letter}</Text>
    </View>
  );
}

export function RouteSearchForm({ initialFrom = '', initialTo = '', loading, error, onSubmit }: Props) {
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const toRef = useRef<TextInput>(null);
  const canSubmit = to.trim().length > 1 && !loading;

  const submit = () => {
    if (!canSubmit) return;
    Keyboard.dismiss();
    onSubmit(from.trim() || 'Your location', to.trim());
  };

  return (
    <View>
      <View style={s.card}>
        <View style={s.row}>
          <Pin letter="A" filled />
          <TextInput
            value={from}
            onChangeText={setFrom}
            placeholder="Your location"
            placeholderTextColor={colors.textMuted}
            style={s.input}
            returnKeyType="next"
            onSubmitEditing={() => toRef.current?.focus()}
            accessibilityLabel="Start address"
          />
        </View>
        <View style={s.divider}>
          <View style={s.connector} />
          <View style={s.line} />
        </View>
        <View style={s.row}>
          <Pin letter="B" />
          <TextInput
            ref={toRef}
            value={to}
            onChangeText={setTo}
            placeholder="Where to?"
            placeholderTextColor={colors.textFaint}
            style={[s.input, { color: colors.text }]}
            returnKeyType="go"
            onSubmitEditing={submit}
            accessibilityLabel="Destination address"
          />
        </View>
      </View>

      <View style={s.chips}>
        {SAVED.map((name) => (
          <Pressable key={name} onPress={() => setTo(name)} style={({ pressed }) => [s.chip, pressed && { opacity: 0.7 }]}>
            <Text style={s.chipText}>{name}</Text>
          </Pressable>
        ))}
      </View>

      {error ? <Text style={s.error}>{error}</Text> : null}

      <Pressable
        onPress={submit}
        disabled={!canSubmit}
        accessibilityRole="button"
        style={({ pressed }) => [s.button, !canSubmit && s.buttonOff, pressed && { opacity: 0.85 }]}
      >
        {loading ? (
          <ActivityIndicator color={colors.bg} />
        ) : (
          <Text style={s.buttonText}>Start guidance</Text>
        )}
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    backgroundColor: colors.surface, borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: 20, paddingVertical: 6,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14, minHeight: 56 },
  input: { flex: 1, color: colors.textMuted, fontSize: 19, fontWeight: '500', paddingVertical: 10 },
  pin: {
    width: 26, height: 26, borderRadius: 13, borderWidth: 1.5, borderColor: colors.green,
    alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface,
  },
  pinText: { color: colors.green, fontSize: 12, fontWeight: '700' },
  divider: { flexDirection: 'row', alignItems: 'center' },
  connector: { width: 1.5, height: 12, marginLeft: 12.25, backgroundColor: colors.greenSoft },
  line: { flex: 1, height: 1, backgroundColor: colors.border, marginLeft: 26 },
  chips: { flexDirection: 'row', gap: 10, marginTop: 14 },
  chip: {
    paddingVertical: 9, paddingHorizontal: 16, borderRadius: radius.pill,
    backgroundColor: colors.surfaceRaised, borderWidth: 1, borderColor: colors.border,
  },
  chipText: { color: colors.text, fontSize: 15, fontWeight: '500' },
  error: { color: colors.red, fontSize: 15, marginTop: 14 },
  button: {
    marginTop: 20, height: 58, borderRadius: radius.lg, backgroundColor: colors.green,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: colors.green, shadowOpacity: 0.35, shadowRadius: 18,
    shadowOffset: { width: 0, height: 0 }, elevation: 8,
  },
  buttonOff: { opacity: 0.35, shadowOpacity: 0 },
  buttonText: { color: colors.bg, fontSize: 18, fontWeight: '700' },
});