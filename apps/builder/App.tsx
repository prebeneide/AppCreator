import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@appcreator/design-system';

export default function App() {
  const theme = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background.primary }]}>
      <Text style={[styles.text, { color: theme.accent.primary }]}>AppCreator</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});
