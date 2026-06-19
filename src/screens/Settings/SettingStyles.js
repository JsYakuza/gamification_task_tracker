import { StyleSheet } from 'react-native';

export const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 20,
    },
    sectionTitle: {
      color: theme.primary,
      fontSize: 12,
      fontFamily: 'Cyber-Bold',
      marginTop: 20,
      marginBottom: 10,
    },
    option: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderColor: theme.divider,
    },
  });
