import React, { useEffect, useState } from 'react';
import {
  AppState,
  AppStateStatus,
  Platform,
} from 'react-native';

import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppNavigator } from './src/navigation/AppNavigator';
import { DriverProfileModal } from './src/components/DriverProfileModal';
import { DriverProfileProvider } from './src/context/DriverProfileContext';

export default function App() {
  const [profileModalVisible, setProfileModalVisible] =
    useState(true);

  useEffect(() => {
    if (Platform.OS !== 'android') {
      return;
    }

    const hideNavigationBar = async () => {
      try {
        await NavigationBar.setVisibilityAsync('hidden');
      } catch (error) {
        console.warn(
          'Could not hide Android navigation bar:',
          error
        );
      }
    };

    hideNavigationBar();

    const subscription = AppState.addEventListener(
      'change',
      (state: AppStateStatus) => {
        if (state === 'active') {
          hideNavigationBar();
        }
      }
    );

    return () => subscription.remove();
  }, []);

  return (
    <SafeAreaProvider>
      <DriverProfileProvider>
        <StatusBar style="light" />

        <AppNavigator />

        <DriverProfileModal
          visible={profileModalVisible}
          onClose={() => setProfileModalVisible(false)}
        />
      </DriverProfileProvider>
    </SafeAreaProvider>
  );
}