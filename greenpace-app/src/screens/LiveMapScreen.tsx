import React from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import { RouteMap } from '../components/RouteMap';

import { AppCard } from '../components/AppCard';
import { AppHeader } from '../components/AppHeader';

import {
  mockDriver,
  mockIntersections,
} from '../data/mockTraffic';

import { colors } from '../theme/colors';


export function LiveMapScreen() {
  const routeCoordinates = [
    {
      latitude: mockDriver.latitude,
      longitude: mockDriver.longitude,
    },

    ...mockIntersections.map((intersection) => ({
      latitude: intersection.latitude,
      longitude: intersection.longitude,
    })),
  ];

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['top']}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <AppHeader />

        <AppCard>
          <Text style={styles.destinationLabel}>
            CURRENT ROUTE
          </Text>

          <Text style={styles.destination}>
            {mockDriver.destination}
          </Text>

          <Text style={styles.routeMeta}>
            {mockDriver.distanceKm} km · {mockDriver.etaMinutes} min
          </Text>
        </AppCard>

        <View style={styles.mapContainer}>
          <RouteMap
            driver={{
              latitude: mockDriver.latitude,
              longitude: mockDriver.longitude,
            }}
            intersections={mockIntersections}
            routeCoordinates={routeCoordinates}
          />
        </View>

        <AppCard style={styles.speedCard}>
          <Text style={styles.label}>
            RECOMMENDED SPEED
          </Text>

          <View style={styles.speedRow}>
            <Text style={styles.speed}>
              {mockDriver.recommendedSpeed}
            </Text>

            <Text style={styles.speedUnit}>
              km/h
            </Text>
          </View>

          <Text style={styles.description}>
            Maintain this speed to improve your chance
            of reaching the next green light.
          </Text>
        </AppCard>

        <Text style={styles.sectionTitle}>
          Upcoming intersections
        </Text>

        {mockIntersections.map((intersection) => (
          <AppCard
            key={intersection.id}
            style={styles.intersectionCard}
          >
            <View style={styles.row}>
              <View>
                <Text style={styles.intersectionName}>
                  {intersection.name}
                </Text>

                <Text style={styles.meta}>
                  {intersection.distanceMeters} m away
                </Text>
              </View>

              <View style={styles.status}>
                <View
                  style={[
                    styles.light,
                    {
                      backgroundColor:
                        intersection.trafficLight === 'green'
                          ? colors.primary
                          : intersection.trafficLight === 'amber'
                          ? colors.amber
                          : colors.red,
                    },
                  ]}
                />

                <Text style={styles.seconds}>
                  {intersection.secondsRemaining}s
                </Text>
              </View>
            </View>
          </AppCard>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 40,
    gap: 14,
  },

  destinationLabel: {
    color: colors.textSecondary,
    fontSize: 11,
  },

  destination: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '700',
    marginTop: 4,
  },

  routeMeta: {
    color: colors.textSecondary,
    marginTop: 6,
  },

  mapContainer: {
    height: 310,
    borderRadius: 22,
    overflow: 'hidden',
  },

  map: {
    flex: 1,
  },

  speedCard: {
    padding: 18,
  },

  label: {
    color: colors.textSecondary,
    fontSize: 11,
    letterSpacing: 1,
  },

  speedRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },

  speed: {
    color: colors.primary,
    fontSize: 58,
    fontWeight: '800',
  },

  speedUnit: {
    color: colors.white,
    fontSize: 18,
    marginLeft: 7,
  },

  description: {
    color: colors.textSecondary,
    marginTop: 4,
  },

  sectionTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },

  intersectionCard: {
    padding: 14,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  intersectionName: {
    color: colors.white,
    fontWeight: '600',
  },

  meta: {
    color: colors.textSecondary,
    marginTop: 4,
  },

  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  light: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },

  seconds: {
    color: colors.white,
    fontWeight: '600',
  },
});
