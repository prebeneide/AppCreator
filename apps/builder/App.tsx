import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme, useIsDark } from '@appcreator/design-system';
import { GlassCard, GlassButton, GlassHeader } from '@appcreator/design-system';
import { spacing } from '@appcreator/design-system';

export default function App() {
  const { t } = useTranslation();
  const theme = useTheme();
  const isDark = useIsDark();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.background.primary }]}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <GlassHeader title={t('app.name')} subtitle={t('app.subtitle')} />
      <View style={styles.content}>
        <GlassCard style={styles.card}>
          <GlassButton
            title={t('button.getStarted')}
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
