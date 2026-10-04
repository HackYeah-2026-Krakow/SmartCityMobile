import React, { useState } from 'react';
import {
  KeyboardAvoidingView, LayoutChangeEvent, Platform, StyleSheet, Text, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {LightCallout } from '../components/Lightcallout';
import {MapBackdrop } from '../components/MapBackdrop';
import {RouteHeader } from '../components/RouteHeader';
import {RouteLine } from '../components/RoutineLine';
import {RouteNode } from '../components/RouteNode';
import {SpeedCard } from '../components/SpeedCar';
import {StatTile } from '../components/StatTile';
import {VehicleMarker } from '../components/VehicleMarker';
import { useGreenWave } from '../hooks/useGreenWave';
import { RouteSearchForm } from '../components/RouteSearchForm';
import { getRoute } from '../services/routing';
import { colors } from '../theme/tokens';
import { Route } from '../types';

const LINE_X = 0.305; // route line position across the screen
const NODE = 22;
const CALLOUT_GAP = 22;

type GuidanceProps = { trip: Route; onEdit: () => void };

function LiveGuidance({ trip, onEdit }: GuidanceProps) {
  const g = useGreenWave(trip);
  const [mapH, setMapH] = useState(0);
  const [mapW, setMapW] = useState(0);

  const onLayout = (e: LayoutChangeEvent) => {
    setMapH(e.nativeEvent.layout.height);
    setMapW(e.nativeEvent.layout.width);
  };

  const vehicleBottom = 8;
  const firstY = 36;
  const lastY = mapH - 60 - vehicleBottom - 52;
  const step = g.lights.length > 1 ? (lastY - firstY) / (g.lights.length - 1) : 0;
  const lineLeft = mapW * LINE_X;

  return (
    <View style={s.root}>
      <SafeAreaView style={s.safe} edges={['top']}>
        <View style={s.header}>
          <RouteHeader from={trip.fromLabel} to={trip.toLabel} onMenuPress={onEdit} />
        </View>

        <View style={s.map} onLayout={onLayout}>
          <MapBackdrop />
          <RouteLine left={`${LINE_X * 100}%`} />

          {mapH > 0 &&
            g.lights.map((l, i) => {
              const y = firstY + i * step;
              return (
                <View key={l.id}>
                  <View style={[s.abs, { left: lineLeft - NODE / 2, top: y - NODE / 2 }]}>
                    <RouteNode />
                  </View>
                  <View style={[s.abs, { left: lineLeft + NODE / 2 + CALLOUT_GAP, top: y - 24 }]}>
                    <LightCallout
                      distanceM={l.distanceM}
                      greenInS={l.greenInS}
                      phase={l.phase}
                      highlighted={l.isNext}
                    />
                  </View>
                </View>
              );
            })}

          <View style={[s.abs, { left: lineLeft - 30, bottom: vehicleBottom }]}>
            <VehicleMarker />
          </View>
        </View>

        <View style={s.bottom}>
          <SpeedCard speedKmh={g.speedKmh} progress={g.progress} />
          <View style={s.stats}>
            <StatTile
              value={`${g.remainingKm >= 10 ? Math.round(g.remainingKm) : g.remainingKm.toFixed(1)} km`}
              label="Distance"
            />
            <StatTile value={`${g.etaMin} min`} label="ETA" />
            <StatTile value={`${g.greenLights}`} label="Green lights" accent />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

// React Navigation injects its own `route` / `navigation` props into tab
// screens, so the trip data is called `trip` here.
export default function LiveMapScreen() {
  const [trip, setTrip] = useState<Route | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [last, setLast] = useState({ from: '', to: '' });

  const start = async (from: string, to: string) => {
    setLoading(true);
    setError(null);
    setLast({ from, to });
    try {
      setTrip(await getRoute(from, to));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not find that route. Check the addresses and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (trip) {
    return <LiveGuidance key={`${trip.fromLabel}-${trip.toLabel}`} trip={trip} onEdit={() => setTrip(null)} />;
  }

  return (
    <View style={s.root}>
      <SafeAreaView style={s.safe} edges={['top']}>
        <KeyboardAvoidingView
          style={s.plan}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View>
            <Text style={s.title}>Plan your route</Text>
            <Text style={s.subtitle}>We'll time your speed so you catch green lights.</Text>
          </View>
          <RouteSearchForm
            initialFrom={last.from}
            initialTo={last.to}
            loading={loading}
            error={error}
            onSubmit={start}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  plan: { flex: 1, paddingHorizontal: 22, paddingTop: 48, gap: 32 },
  title: { color: colors.text, fontSize: 32, fontWeight: '800', letterSpacing: -0.5 },
  subtitle: { color: colors.textMuted, fontSize: 16, lineHeight: 23, marginTop: 8 },
  root: { flex: 1, backgroundColor: colors.bg },
  safe: { flex: 1 },
  header: { paddingHorizontal: 22, paddingTop: 12, zIndex: 2 },
  map: { flex: 1, marginTop: -8 },
  abs: { position: 'absolute' },
  bottom: { paddingHorizontal: 22, gap: 14, paddingBottom: 8 },
  stats: { flexDirection: 'row', gap: 12 },
});