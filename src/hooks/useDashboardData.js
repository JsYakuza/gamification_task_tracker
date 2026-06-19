import { useState, useEffect, useCallback } from 'react';
import { Adapter } from '../database/infrastructure/DatabaseAdapter';

export const useDashboardData = () => {
  const [quests, setQuests] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const [dailyQuests, profile] = await Promise.all([
        Adapter.quests.getDailyQuests(today),
        Adapter.users.getProfile(),
      ]);

      setQuests(dailyQuests);
      setUserProfile(profile);
    } catch (error) {
      console.error('Ошибка загрузки данных профиля:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  const refreshData = async () => {
    setIsRefreshing(true);
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { quests, userProfile, isLoading, isRefreshing, refreshData };
};
