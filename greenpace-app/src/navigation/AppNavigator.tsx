import React from 'react';

import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {
  Ionicons,
} from '@expo/vector-icons';

import {
  LiveMapScreen,
} from '../screens/LiveMapScreen';

import {
  ImpactDashboardScreen,
} from '../screens/ImpactDashboardScreen';

import {
  RewardsScreen,
} from '../screens/RewardsScreen';

import { colors } from '../theme/colors';


const Tab = createBottomTabNavigator();


export function AppNavigator() {

  return (

    <NavigationContainer>

      <Tab.Navigator
        screenOptions={({ route }) => ({

          headerShown: false,

          tabBarStyle: {
            backgroundColor: colors.card,
            borderTopColor: colors.border,
            height: 70,
            paddingBottom: 8,
          },

          tabBarActiveTintColor:
            colors.primary,

          tabBarInactiveTintColor:
            colors.textSecondary,

          tabBarIcon: ({
            color,
            size,
          }) => {

            let icon:
              keyof typeof Ionicons.glyphMap =
              'map';

            if (route.name === 'Map') {
              icon = 'map';
            }

            if (route.name === 'Impact') {
              icon = 'stats-chart';
            }

            if (route.name === 'Rewards') {
              icon = 'gift';
            }

            return (
              <Ionicons
                name={icon}
                size={size}
                color={color}
              />
            );

          },

        })}
      >

        <Tab.Screen
          name="Map"
          component={LiveMapScreen}
        />

        <Tab.Screen
          name="Impact"
          component={ImpactDashboardScreen}
        />

        <Tab.Screen
          name="Rewards"
          component={RewardsScreen}
        />

      </Tab.Navigator>

    </NavigationContainer>

  );
}
