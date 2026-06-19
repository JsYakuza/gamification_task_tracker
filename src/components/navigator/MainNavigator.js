import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../../theme/ThemeContext';
import { getNavigationOptions } from './MainNavigatorStyles';

import { DashboardScreen } from '../../screens/Dashboard/DashboardScreen';
import { QuestAddScreen } from '../../screens/QuestAddScreen';
import { QuestFormScreen } from '../../screens/QuestFormScreen';
import { SettingsScreen } from '../../screens/Settings/SettingsScreen';

const Stack = createStackNavigator();

export const MainNavigator = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator id="MainTracker" screenOptions={getNavigationOptions(theme)}>
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: '[ ДАННЫЕ ПРОФИЛЯ ]' }}
      />
      <Stack.Screen
        name="QuestAdd"
        component={QuestAddScreen}
        options={{ title: '[ ДОБАВИТЬ_КВЕСТ ]' }}
      />
      <Stack.Screen
        name="QuestForm"
        component={QuestFormScreen}
        options={{ title: '[ ФОРМА_ЗАДАЧИ ]' }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: '[ НАСТРОЙКИ ]' }}
      />
    </Stack.Navigator>
  );
};
