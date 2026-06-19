import React from 'react';
import { View, Text } from 'react-native';

export const DashboardHeader = ({ user, styles }) => (
  <View style={styles.headerBox}>
    <Text style={styles.userId}>USER_ID: {user.username.toUpperCase()}_001</Text>
    <View style={styles.statsRow}>
      <View>
        <Text style={styles.statLabel}>LEVEL</Text>
        <Text style={styles.statValue}>{user.level}</Text>
      </View>
      <View style={styles.divider} />
      <View>
        <Text style={styles.statLabel}>CREDITS</Text>
        <Text style={styles.statValue}>{user.gold}</Text>
      </View>
    </View>
    <Text style={styles.statLabel}>ENERGY CORE</Text>
    <View style={styles.barTrack}>
      <View style={[styles.barFill, { width: `${(user.current_energy / 10) * 100}%` }]} />
    </View>
  </View>
);
