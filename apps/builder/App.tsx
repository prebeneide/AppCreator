import { View, Text, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { useTheme, useIsDark, GlassButton } from '@appcreator/design-system';

export default function App() {
  const { t } = useTranslation();
  const theme = useTheme();
  const isDark = useIsDark();
  return (
    <View style={[styles.container, { backgroundColor: theme.background.primary }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Text style={[styles.title, { color: theme.accent.primary }]}>AppCreator</Text>
      <Text style={[styles.subtitle, { color: theme.text.secondary }]}>
        {t('app.subtitle')}
      </Text>
      <GlassButton
        title={t('button.getStarted')}
        onPress={() => Alert.alert(t('app.name'), t('button.getStarted'))}
        variant="primary"
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  button: {
    marginTop: 24,
  },
});
