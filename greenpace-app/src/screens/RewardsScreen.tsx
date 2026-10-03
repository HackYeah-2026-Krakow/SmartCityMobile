import React, {
  useState,
} from 'react';

import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import ConfettiCannon from 'react-native-confetti-cannon';

import { AppCard } from '../components/AppCard';
import { AppHeader } from '../components/AppHeader';

import {
  availableRewards,
  mockRanking,
  Reward,
  rewardsSummary,
} from '../data/mockRewards';

import { colors } from '../theme/colors';


export function RewardsScreen() {
  const [points, setPoints] = useState(
    rewardsSummary.points
  );

  const [selectedReward, setSelectedReward] =
    useState<Reward | null>(null);

  const [successVisible, setSuccessVisible] =
    useState(false);

  const progress =
    rewardsSummary.monthlyEarned /
    rewardsSummary.monthlyGoal;


  const redeemReward = (reward: Reward) => {
    if (points < reward.cost) {
      return;
    }

    setPoints((current) =>
      current - reward.cost
    );

    setSelectedReward(reward);
    setSuccessVisible(true);
  };


  const getSuccessMessage = () => {
    if (!selectedReward) {
      return '';
    }

    if (
      selectedReward.type === 'parking' &&
      selectedReward.durationDays
    ) {
      return (
        `Your vehicle ${rewardsSummary.vehicle.registrationNumber} ` +
        `is already stored in GreenPace. ` +
        `For the next ${selectedReward.durationDays} ` +
        `${selectedReward.durationDays === 1 ? 'day' : 'days'}, ` +
        `you do not need to worry about parking costs ` +
        `in participating city parking zones.`
      );
    }

    if (selectedReward.type === 'transport') {
      return (
        'Your public transport reward has been activated. ' +
        'The discount is now available in your GreenPace account.'
      );
    }

    return 'Your reward has been activated.';
  };


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
            {points}
          </Text>

          <Text style={styles.balanceHint}>
            Drive smarter. Earn more. Unlock city benefits.
          </Text>
        </AppCard>


        <AppCard>
          <Text style={styles.title}>
            Monthly goal
          </Text>

          <Text style={styles.progressText}>
            {rewardsSummary.monthlyEarned}
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


        <View style={styles.statsRow}>
          <AppCard style={styles.halfCard}>
            <Text style={styles.title}>
              Driving streak
            </Text>

            <Text style={styles.largeValue}>
              {rewardsSummary.streakDays}
            </Text>

            <Text style={styles.smallText}>
              days
            </Text>
          </AppCard>


          <AppCard style={styles.halfCard}>
            <Text style={styles.title}>
              CO₂ saved
            </Text>

            <Text style={styles.largeValue}>
              {rewardsSummary.co2SavedKg}
            </Text>

            <Text style={styles.smallText}>
              kg
            </Text>
          </AppCard>
        </View>


        <Text style={styles.sectionTitle}>
          Kraków ranking
        </Text>

        <AppCard>
          {mockRanking.map((entry) => (
            <View
              key={entry.id}
              style={[
                styles.rankingRow,
                entry.isCurrentUser &&
                  styles.currentUserRow,
              ]}
            >
              <Text style={styles.rank}>
                {entry.rank === 1
                  ? '🥇'
                  : entry.rank === 2
                  ? '🥈'
                  : entry.rank === 3
                  ? '🥉'
                  : `#${entry.rank}`}
              </Text>

              <Text
                style={[
                  styles.rankingName,
                  entry.isCurrentUser &&
                    styles.currentUserText,
                ]}
              >
                {entry.name}
              </Text>

              <Text
                style={[
                  styles.rankingPoints,
                  entry.isCurrentUser &&
                    styles.currentUserText,
                ]}
              >
                {entry.points} pts
              </Text>
            </View>
          ))}
        </AppCard>


        <Text style={styles.sectionTitle}>
          Available rewards
        </Text>


        {availableRewards.map((reward) => {
          const affordable =
            points >= reward.cost;

          return (
            <Pressable
              key={reward.id}
              onPress={() =>
                redeemReward(reward)
              }
              disabled={!affordable}
              style={({ pressed }) => [
                pressed &&
                  affordable &&
                  styles.pressed,
              ]}
            >
              <AppCard
                style={
                  !affordable
                    ? styles.disabledCard
                    : undefined
                }
              >
                <View style={styles.rewardRow}>
                  <View style={styles.rewardContent}>
                    <Text
                      style={[
                        styles.rewardTitle,
                        !affordable &&
                          styles.disabledText,
                      ]}
                    >
                      {reward.title}
                    </Text>

                    <Text style={styles.rewardDescription}>
                      {reward.description}
                    </Text>

                    <Text
                      style={[
                        styles.rewardCost,
                        !affordable &&
                          styles.disabledText,
                      ]}
                    >
                      {reward.cost} points
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.redeemButton,
                      !affordable &&
                        styles.redeemButtonDisabled,
                    ]}
                  >
                    <Text
                      style={[
                        styles.redeemText,
                        !affordable &&
                          styles.disabledText,
                      ]}
                    >
                      {affordable
                        ? 'Redeem'
                        : 'Locked'}
                    </Text>
                  </View>
                </View>
              </AppCard>
            </Pressable>
          );
        })}
      </ScrollView>


      <Modal
        transparent
        visible={successVisible}
        animationType="fade"
        onRequestClose={() =>
          setSuccessVisible(false)
        }
      >
        <View style={styles.modalOverlay}>
          <View style={styles.successCard}>
            <Text style={styles.successEmoji}>
              🎉
            </Text>

            <Text style={styles.successTitle}>
              Reward unlocked!
            </Text>

            <Text style={styles.successReward}>
              {selectedReward?.title}
            </Text>

            <Text style={styles.successMessage}>
              {getSuccessMessage()}
            </Text>

            <View style={styles.newBalanceBox}>
              <Text style={styles.newBalanceLabel}>
                NEW BALANCE
              </Text>

              <Text style={styles.newBalance}>
                {points} GreenPoints
              </Text>
            </View>

            <Pressable
              style={styles.closeButton}
              onPress={() =>
                setSuccessVisible(false)
              }
            >
              <Text style={styles.closeButtonText}>
                Awesome!
              </Text>
            </Pressable>
          </View>

          <ConfettiCannon
            count={120}
            origin={{
              x: 180,
              y: -20,
            }}
            fallSpeed={2500}
            fadeOut
            autoStart
          />
        </View>
      </Modal>
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

  balanceHint: {
    color: colors.background,
    opacity: 0.75,
    fontSize: 12,
    fontWeight: '600',
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

  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },

  halfCard: {
    flex: 1,
  },

  largeValue: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: '800',
    marginTop: 6,
  },

  smallText: {
    color: colors.textSecondary,
    fontSize: 12,
  },

  sectionTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },

  rankingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  currentUserRow: {
    backgroundColor: '#183326',
    borderRadius: 10,
    paddingHorizontal: 8,
  },

  rank: {
    width: 42,
    color: colors.white,
    fontWeight: '700',
  },

  rankingName: {
    flex: 1,
    color: colors.white,
    fontWeight: '600',
  },

  rankingPoints: {
    color: colors.textSecondary,
    fontWeight: '700',
  },

  currentUserText: {
    color: colors.primary,
  },

  rewardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },

  rewardContent: {
    flex: 1,
  },

  rewardTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },

  rewardDescription: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 4,
  },

  rewardCost: {
    color: colors.primary,
    marginTop: 8,
    fontWeight: '700',
  },

  redeemButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },

  redeemButtonDisabled: {
    backgroundColor: colors.border,
  },

  redeemText: {
    color: colors.background,
    fontWeight: '800',
    fontSize: 12,
  },

  disabledCard: {
    opacity: 0.55,
  },

  disabledText: {
    color: colors.textSecondary,
  },

  pressed: {
    opacity: 0.75,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.82)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  successCard: {
    width: '100%',
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },

  successEmoji: {
    fontSize: 56,
  },

  successTitle: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: '900',
    marginTop: 8,
  },

  successReward: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '800',
    marginTop: 8,
    textAlign: 'center',
  },

  successMessage: {
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 14,
  },

  newBalanceBox: {
    width: '100%',
    backgroundColor: colors.background,
    padding: 14,
    borderRadius: 14,
    marginTop: 20,
    alignItems: 'center',
  },

  newBalanceLabel: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '700',
  },

  newBalance: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: '900',
    marginTop: 4,
  },

  closeButton: {
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 18,
  },

  closeButtonText: {
    color: colors.background,
    fontWeight: '900',
    fontSize: 16,
  },
});
