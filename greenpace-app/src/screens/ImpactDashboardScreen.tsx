import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { AppCard } from '../components/AppCard';

import {
  impactMetrics,
  impactSummary,
} from '../data/mockImpact';

import { colors } from '../theme/colors';


export function ImpactDashboardScreen() {

  return (

    <SafeAreaView style={styles.safeArea}>

      <ScrollView
        contentContainerStyle={styles.content}
      >

        <Text style={styles.brand}>
          ● GREENPACE
        </Text>

        <Text style={styles.title}>
          Your impact
        </Text>

        <Text style={styles.subtitle}>
          Estimated impact based on your driving data.
        </Text>


        {impactMetrics.map((metric) => (

          <AppCard key={metric.id}>

            <Text style={styles.metricLabel}>
              {metric.label}
            </Text>

            <Text style={styles.unit}>
              {metric.unit}
            </Text>

            <View style={styles.comparison}>

              <View>

                <Text style={styles.smallLabel}>
                  Before
                </Text>

                <Text style={styles.before}>
                  {metric.before}
                </Text>

              </View>


              <View>

                <Text style={styles.smallLabel}>
                  With GreenPace
                </Text>

                <Text style={styles.after}>
                  {metric.after}
                </Text>

              </View>

            </View>

            <Text style={styles.delta}>
              ↓ {metric.reduction}% estimated reduction
            </Text>

          </AppCard>

        ))}


        <AppCard>

          <Text style={styles.metricLabel}>
            GREENPOINTS
          </Text>

          <Text style={styles.points}>
            {impactSummary.greenPoints}
          </Text>

          <Text style={styles.subtitle}>
            Earned by contributing traffic data
          </Text>

        </AppCard>


      </ScrollView>

    </SafeAreaView>

  );
}


const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: 16,
    paddingBottom: 40,
    gap: 14,
  },

  brand: {
    color: colors.primary,
    fontWeight: '700',
  },

  title: {
    color: colors.white,
    fontSize: 32,
    fontWeight: '800',
  },

  subtitle: {
    color: colors.textSecondary,
  },

  metricLabel: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },

  unit: {
    color: colors.textSecondary,
    marginTop: 3,
  },

  comparison: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },

  smallLabel: {
    color: colors.textSecondary,
    fontSize: 12,
  },

  before: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '700',
    marginTop: 4,
  },

  after: {
    color: colors.primary,
    fontSize: 32,
    fontWeight: '800',
    marginTop: 4,
  },

  delta: {
    color: colors.primary,
    marginTop: 12,
  },

  points: {
    color: colors.primary,
    fontSize: 58,
    fontWeight: '800',
    marginTop: 6,
  },

});
