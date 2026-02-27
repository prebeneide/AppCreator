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
  const { t } = useTranslation();
  const theme = useTheme();
  const isDark = useIsDark();

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
