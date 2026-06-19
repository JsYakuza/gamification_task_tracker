import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export const SettingsButton = ({ navigation, color }) => (
  <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
    <Text style={{ color, fontSize: 16 }}>⚙️</Text>
  </TouchableOpacity>
);
