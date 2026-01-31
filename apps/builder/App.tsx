import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { darkTheme, spacing } from '@appcreator/design-system';

export default function App() {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkTheme.background.primary },
      ]}
    >
      <Text style={[styles.text, { color: darkTheme.text.primary }]}>
        Open up App.tsx to start working on your app!
      </Text>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[4],
  },
  text: {
    fontSize: 16,
  },
});
