import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '@appcreator/design-system';

export default function App() {
  const theme = useTheme();
  return (
    <NavigationContainer>
      <View style={[styles.container, { backgroundColor: theme.background.primary }]}>
        <Text style={[styles.text, { color: theme.accent.primary }]}>AppCreator</Text>
      </View>
    </NavigationContainer>
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
