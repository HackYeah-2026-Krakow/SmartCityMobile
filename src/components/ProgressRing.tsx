import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors, numeric } from '../theme/tokens';

type Props = { percent: number; size?: number; stroke?: number };

export function ProgressRing({ percent, size = 124, stroke = 12 }: Props) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - Math.min(Math.max(percent, 0), 100) / 100);

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={colors.track} strokeWidth={stroke} fill="none" />
        <Circle
          cx={size / 2} cy={size / 2} r={r}
          stroke={colors.green} strokeWidth={stroke} fill="none"
          strokeLinecap="round"
          strokeDasharray={`${c} ${c}`} strokeDashoffset={offset}
          rotation={-90} origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={StyleSheet.absoluteFill}>
        <View style={s.center}>
          <Text style={[s.value, numeric]}>{percent}%</Text>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  value: { color: colors.text, fontSize: 28, fontWeight: '700' },
});
