import React, { useEffect } from 'react';

import {
  AppState,
  AppStateStatus,
  Platform,
} from 'react-native';

import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
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

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}
