import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useTheme, useIsDark } from '@appcreator/design-system';
import { GlassCard, GlassButton, GlassHeader } from '@appcreator/design-system';
import { spacing } from '@appcreator/design-system';

export default function App() {
  const theme = useTheme();
  const isDark = useIsDark();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.background.primary }]}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <GlassHeader title="AppCreator" subtitle="AI Mobile App Builder" />
      <View style={styles.content}>
        <GlassCard style={styles.card}>
          <GlassButton
            title="Get Started"
            onPress={() => console.log('Pressed')}
            variant="primary"
          />
        </GlassCard>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: spacing[4],
    justifyContent: 'center',
  },
  card: {
    padding: spacing[4],
  },
});
