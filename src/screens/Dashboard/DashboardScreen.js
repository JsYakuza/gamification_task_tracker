import React, { useLayoutEffect } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  RefreshControl,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { getStyles } from './DashboardStyles';
import { useDashboardData } from '../../hooks/useDashboardData';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { QuestCard } from '../../components/dashboard/QuestCard';
import { SettingsButton } from '../../components/dashboard/SettingsButton';
import { getNavigationOptions } from '../../components/navigator/MainNavigatorStyles';
import { ThemeIndicator } from '../../components/dashboard/ThemeIndicator';

export const DashboardScreen = ({ navigation }) => {
  const { theme, themeName } = useTheme();
  const styles = getStyles(theme);
  const { quests, userProfile, isLoading, isRefreshing, refreshData } = useDashboardData();

  useLayoutEffect(() => {
    navigation.setOptions(
      getNavigationOptions(
        theme,
        '[ ДАННЫЕ ПРОФИЛЯ ]',
        () => (
          <ThemeIndicator navigation={navigation} themeName={themeName} color={theme.primary} />
        ),
        () => <SettingsButton navigation={navigation} color={theme.primary} />
      )
    );
  }, [navigation, theme, themeName]);

  if (isLoading || !userProfile) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.gridOverlay} pointerEvents="none" />

      <FlatList
        ListHeaderComponent={<DashboardHeader user={userProfile} styles={styles} />}
        data={quests}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshData}
            tintColor={theme.primary}
            colors={[theme.primary]}
          />
        }
        renderItem={({ item }) => (
          <QuestCard
            item={item}
            styles={styles}
            onPress={() => navigation.navigate('QuestForm', { questId: item.id })}
          />
        )}
      />

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('QuestAdd')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};
