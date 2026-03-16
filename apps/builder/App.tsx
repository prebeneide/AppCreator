import { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { useTheme, useIsDark, GlassButton, spacing } from '@appcreator/design-system';
import ChatScreen from './src/screens/ChatScreen';

type Screen = 'home' | 'chat';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isDark = useIsDark();
  const currentLang = i18n.language?.startsWith('nb') ? 'nb' : 'en';

  if (screen === 'chat') {
    return (
      <SafeAreaProvider>
        <View style={[styles.container, { backgroundColor: theme.background.primary }]}>
          <StatusBar style={isDark ? 'light' : 'dark'} />
          <ChatScreen onBack={() => setScreen('home')} />
        </View>
      </SafeAreaProvider>
    );
  }

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
            onPress={() => setScreen('chat')}
            variant="primary"
            style={styles.button}
          />
          <View style={styles.langRow}>
            <GlassButton
              title={t('language.nb')}
              onPress={() => i18n.changeLanguage('nb')}
              variant={currentLang === 'nb' ? 'primary' : 'secondary'}
              style={styles.langButton}
            />
            <GlassButton
              title={t('language.en')}
              onPress={() => i18n.changeLanguage('en')}
              variant={currentLang === 'en' ? 'primary' : 'secondary'}
              style={styles.langButton}
            />
          </View>
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
  langRow: {
    flexDirection: 'row',
    marginTop: spacing[8],
    gap: spacing[3],
  },
  langButton: {
    minWidth: 0,
    paddingHorizontal: spacing[4],
  },
});
