import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

export const QuestCard = ({ item, styles, onPress }) => (
  <TouchableOpacity style={styles.questCard} onPress={onPress}>
    <View style={styles.cardHeader}>
      <Text style={styles.questTitle}>{item.title.toUpperCase()}</Text>
      <Text style={styles.energy}>⚡{item.energy_cost}</Text>
    </View>
    <Text style={styles.questReward}>
      {item.gold_reward} CR • {item.xp_reward} XP
    </Text>
  </TouchableOpacity>
);
