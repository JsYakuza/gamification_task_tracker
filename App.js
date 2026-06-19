import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './src/theme/ThemeContext';
import { MainNavigator } from './src/components/navigator/MainNavigator';
import { useAppSetup } from './src/hooks/useAppSetup';

export default function App() {
  const { isReady } = useAppSetup();

  if (!isReady) return null;

  return (
    <ThemeProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
