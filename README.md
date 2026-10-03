# GreenPace

GreenPace is a smart-city mobility prototype developed during HackYeah 2026 in Kraków.

The application uses crowdsourced mobility data to provide drivers with traffic-related insights while providing cities with additional information about congestion, intersection efficiency, delays, fuel consumption and emissions.

The current repository contains the driver-facing React Native prototype.

## Main Features

- Live traffic map
- Recommended driving speed
- Upcoming intersection information
- Traffic-light status simulation
- Driver impact dashboard
- Estimated time savings
- Estimated fuel savings
- Estimated CO₂ reduction
- GreenPoints reward system
- Gamified city ranking
- Redeemable city rewards
- Simulated free-parking rewards
- Reward confirmation animations and confetti

## Technology

The application is built using:

- React Native
- Expo
- TypeScript
- React Navigation
- React Native Maps
- Expo Location
- Expo Navigation Bar
- React Native Safe Area Context
- React Native Confetti Cannon

The current prototype uses mocked data to demonstrate the complete user experience without requiring a production backend.

---

# Project Structure

```text
greenpace-app/
│
├── App.tsx
├── index.ts
├── package.json
│
├── src/
│   ├── components/
│   │   ├── AppCard.tsx
│   │   └── AppHeader.tsx
│   │
│   ├── data/
│   │   ├── mockTraffic.ts
│   │   ├── mockImpact.ts
│   │   └── mockRewards.ts
│   │
│   ├── navigation/
│   │   └── AppNavigator.tsx
│   │
│   ├── screens/
│   │   ├── LiveMapScreen.tsx
│   │   ├── ImpactDashboardScreen.tsx
│   │   └── RewardsScreen.tsx
│   │
│   └── theme/
│       └── colors.ts
│
└── assets/
