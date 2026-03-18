import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { useTheme, useIsDark, GlassButton, spacing } from '@appcreator/design-system';
import { getStoredLanguage, setStoredLanguage } from './src/i18n/config';
import ChatScreen from './src/screens/ChatScreen';
import PreviewScreen from './src/screens/PreviewScreen';

type Screen = 'home' | 'chat' | 'preview';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [languageReady, setLanguageReady] = useState(false);
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isDark = useIsDark();
  const currentLang = i18n.language?.startsWith('nb') ? 'nb' : 'en';

  useEffect(() => {
    getStoredLanguage().then((stored) => {
      if (stored) i18n.changeLanguage(stored);
      setLanguageReady(true);
    });
  }, [i18n]);

  const setLanguage = (lang: 'en' | 'nb') => {
    i18n.changeLanguage(lang);
    setStoredLanguage(lang);
  };

  if (!languageReady) {
    return (
      <SafeAreaProvider>
        <View style={[styles.container, { backgroundColor: theme.background.primary }]} />
      </SafeAreaProvider>
    );
  }

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

  if (screen === 'preview') {
    return (
      <SafeAreaProvider>
        <View style={[styles.container, { backgroundColor: theme.background.primary }]}>
          <StatusBar style={isDark ? 'light' : 'dark'} />
          <PreviewScreen onBack={() => setScreen('home')} />
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
          <GlassButton
            title={t('preview.title')}
            onPress={() => setScreen('preview')}
            variant="secondary"
            style={styles.button}
          />
          <View style={styles.langRow}>
            <GlassButton
              title={t('language.nb')}
              onPress={() => setLanguage('nb')}
              variant={currentLang === 'nb' ? 'primary' : 'secondary'}
              style={styles.langButton}
            />
            <GlassButton
              title={t('language.en')}
              onPress={() => setLanguage('en')}
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
