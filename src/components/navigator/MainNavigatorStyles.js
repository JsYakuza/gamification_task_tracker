// MainNavigatorStyles.js
import React from 'react';
import { View, Text } from 'react-native';

export const getNavigationOptions = (theme, title = null, LeftComp = null, RightComp = null) => ({
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: theme.background,
    borderBottomWidth: 2,
    borderColor: theme.primary,
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTintColor: theme.primary,
  headerTitleStyle: {
    fontFamily: 'Cyber-Bold',
    fontSize: 10,
    textTransform: 'uppercase',
    color: theme.primary,
  },
  headerTitle: title
    ? () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {LeftComp && <LeftComp />}
          <Text
            style={{
              fontFamily: 'Cyber-Bold',
              fontSize: 14,
              color: theme.primary,
              textTransform: 'uppercase',
            }}
          >
            {title}
          </Text>
          {RightComp && <RightComp />}
        </View>
      )
    : undefined,
  headerTitleContainerStyle: title ? { left: 0, right: 0, marginHorizontal: 0 } : undefined,
  headerLeft: title ? () => null : undefined,
  headerRight: title ? () => null : undefined,
  headerBackTitle: '',
  headerBackTitleStyle: {
    fontFamily: 'Cyber-Bold',
    fontSize: 10,
  },
  cardStyle: { backgroundColor: theme.background },
});
