import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { useTheme, useIsDark, GlassButton, spacing } from '@appcreator/design-system';

export default function App() {
  const { t } = useTranslation();
  const theme = useTheme();
  const isDark = useIsDark();
  return (
    <SafeAreaProvider>
      <View style={[styles.container, { backgroundColor: theme.background.primary }]}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <SafeAreaView style={styles.safeContent} edges={['top', 'bottom']}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.accent.primary }]}>AppCreator</Text>
            <Text style={[styles.subtitle, { color: theme.text.secondary }]}>
              {t('app.subtitle')}
            </Text>
          </View>
          <GlassButton
            title={t('button.getStarted')}
            onPress={() => Alert.alert(t('app.name'), t('button.getStarted'))}
            variant="primary"
            style={styles.button}
          />
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing[6],
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing[8],
  },
  title: {
    fontSize: 24,
  },
  subtitle: {
    fontSize: 14,
    marginTop: spacing[1],
    textAlign: 'center',
  },
  button: {
    minWidth: 200,
  },
});
