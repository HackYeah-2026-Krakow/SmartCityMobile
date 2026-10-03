export interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  type: 'parking' | 'transport' | 'other';
  durationDays?: number;
}

export interface RankingEntry {
  id: string;
  rank: number;
  name: string;
  points: number;
  isCurrentUser?: boolean;
}

export const rewardsSummary = {
  points: 740,

  // This does NOT decrease when a reward is redeemed.
  // It represents points earned during this month.
  monthlyEarned: 740,

  monthlyGoal: 1000,
  streakDays: 7,
  co2SavedKg: 8.4,

  vehicle: {
    registrationNumber: 'KR 4GREEN',
    model: 'Honda Civic',
  },
};

export const availableRewards: Reward[] = [
  {
    id: 'parking-1-day',
    title: '1 day free parking',
    description: 'Park free in participating city parking zones for 1 day.',
    cost: 250,
    type: 'parking',
    durationDays: 1,
  },

  {
    id: 'parking-3-days',
    title: '3 days free parking',
    description: 'Park free in participating city parking zones for 3 days.',
    cost: 500,
    type: 'parking',
    durationDays: 3,
  },

  {
    id: 'parking-7-days',
    title: '7 days free parking',
    description: 'Park free in participating city parking zones for 7 days.',
    cost: 700,
    type: 'parking',
    durationDays: 7,
  },

  {
    id: 'transport-discount',
    title: 'Public transport discount',
    description: 'Receive a discount for your next public transport ticket.',
    cost: 350,
    type: 'transport',
  },
];

export const mockRanking: RankingEntry[] = [
  {
    id: '1',
    rank: 1,
    name: 'EcoDriver91',
    points: 1280,
  },
  {
    id: '2',
    rank: 2,
    name: 'GreenKrakow',
    points: 1060,
  },
  {
    id: '3',
    rank: 3,
    name: 'CityRider',
    points: 890,
  },
  {
    id: '4',
    rank: 4,
    name: 'You',
    points: 740,
    isCurrentUser: true,
  },
  {
    id: '5',
    rank: 5,
    name: 'SmoothDriver',
    points: 690,
  },
];
