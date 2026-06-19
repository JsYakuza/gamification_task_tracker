import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { getStyles } from '../Dashboard/DashboardStyles';

export const SettingsScreen = () => {
  const { theme, setThemeName } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>THEME</Text>
      <TouchableOpacity onPress={() => setThemeName('cyberpunk')}>
        <Text style={{ color: theme.primary }}>Cyberpunk</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setThemeName('witcher')}>
        <Text style={{ color: theme.primary }}>Witcher</Text>
      </TouchableOpacity>

      {/*<Text style={styles.sectionTitle}>LANGUAGE</Text>*/}
      {/*<TouchableOpacity onPress={() => changeLanguage('ru')}>*/}
      {/*  <Text style={{ color: theme.primary }}>Русский</Text>*/}
      {/*</TouchableOpacity>*/}
    </View>
  );
};
