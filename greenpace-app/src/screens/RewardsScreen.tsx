import React from 'react';

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import { AppCard } from '../components/AppCard';
import { AppHeader } from '../components/AppHeader';

import {
  availableRewards,
  rewardsSummary,
} from '../data/mockRewards';

import { colors } from '../theme/colors';


export function RewardsScreen() {
  const progress =
    rewardsSummary.points /
    rewardsSummary.monthlyGoal;

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

        <AppCard style={styles.balanceCard}>
          <Text style={styles.darkLabel}>
            AVAILABLE GREENPOINTS
          </Text>

          <Text style={styles.balance}>
            {rewardsSummary.points}
          </Text>
        </AppCard>

        <AppCard>
          <Text style={styles.title}>
            Monthly goal
          </Text>

          <Text style={styles.progressText}>
            {rewardsSummary.points}
            {' / '}
            {rewardsSummary.monthlyGoal}
          </Text>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                {
                  width:
                    `${Math.min(progress * 100, 100)}%`,
                },
              ]}
            />
          </View>
        </AppCard>

        <AppCard>
          <Text style={styles.title}>
            Driving streak
          </Text>

          <Text style={styles.largeValue}>
            {rewardsSummary.streakDays} days
          </Text>
        </AppCard>

        <AppCard>
          <Text style={styles.title}>
            CO₂ saved
          </Text>

          <Text style={styles.largeValue}>
            {rewardsSummary.co2SavedKg} kg
          </Text>
        </AppCard>

        <Text style={styles.sectionTitle}>
          Available rewards
        </Text>

        {availableRewards.map((reward) => (
          <Pressable key={reward.id}>
            <AppCard>
              <View style={styles.rewardRow}>
                <View>
                  <Text style={styles.rewardTitle}>
                    {reward.title}
                  </Text>

                  <Text style={styles.rewardCost}>
                    {reward.cost} points
                  </Text>
                </View>

                <Text style={styles.chevron}>
                  ›
                </Text>
              </View>
            </AppCard>
          </Pressable>
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

  balanceCard: {
    backgroundColor: colors.primary,
  },

  darkLabel: {
    color: colors.background,
    fontWeight: '700',
    fontSize: 12,
  },

  balance: {
    color: colors.background,
    fontSize: 68,
    fontWeight: '900',
  },

  title: {
    color: colors.white,
    fontWeight: '700',
  },

  progressText: {
    color: colors.textSecondary,
    marginTop: 8,
  },

  progressBackground: {
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.border,
    marginTop: 12,
    overflow: 'hidden',
  },

  progressFill: {
    height: 10,
    backgroundColor: colors.primary,
  },

  largeValue: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: '800',
    marginTop: 6,
  },

  sectionTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
  },

  rewardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  rewardTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },

  rewardCost: {
    color: colors.textSecondary,
    marginTop: 4,
  },

  chevron: {
    color: colors.primary,
    fontSize: 34,
  },
});
