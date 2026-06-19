import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

export const ThemeIndicator = ({ navigation, themeName, color }) => (
  <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
    <Text
      style={{ color, fontSize: 10, fontFamily: 'Cyber-Bold', letterSpacing: 1 }}
      numberOfLines={1}
      ellipsizeMode="tail"
    >
      {themeName.toUpperCase()}
    </Text>
  </TouchableOpacity>
);
