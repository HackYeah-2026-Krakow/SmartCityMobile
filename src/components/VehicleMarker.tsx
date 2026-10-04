import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../theme/tokens';

export function VehicleMarker() {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(pulse, {
        toValue: 1, duration: 2200, easing: Easing.out(Easing.quad), useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  return (
    <View style={s.wrap}>
      <Animated.View
        style={[
          s.halo,
          {
            opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0] }),
            transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1.35] }) }],
          },
        ]}
      />
      <View style={s.ring}>
        <View style={s.core}>
          <Svg width={20} height={20} viewBox="0 0 24 24">
            <Path d="M12 3 L19.5 20 L12 16 L4.5 20 Z" fill={colors.bg} />
          </Svg>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { width: 60, height: 60, alignItems: 'center', justifyContent: 'center' },
  halo: { position: 'absolute', width: 60, height: 60, borderRadius: 30, backgroundColor: colors.green },
  ring: {
    width: 46, height: 46, borderRadius: 23, backgroundColor: 'rgba(114,242,142,0.18)',
    alignItems: 'center', justifyContent: 'center',
  },
  core: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: colors.green, borderWidth: 2.5, borderColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
  },
});
