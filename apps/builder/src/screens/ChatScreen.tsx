import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@appcreator/design-system';

export default function ChatScreen() {
  const theme = useTheme();
  return <View style={[styles.container, { backgroundColor: theme.background.primary }]} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

