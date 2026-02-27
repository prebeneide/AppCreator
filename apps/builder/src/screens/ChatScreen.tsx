import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, GlassButton, spacing } from '@appcreator/design-system';
import { useTranslation } from 'react-i18next';

interface ChatScreenProps {
  onBack?: () => void;
}

export default function ChatScreen({ onBack }: ChatScreenProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background.primary }]} edges={['top', 'bottom']}>
      {onBack != null && (
        <View style={styles.header}>
          <GlassButton title={t('button.cancel')} onPress={onBack} variant="secondary" style={styles.backButton} />
        </View>
      )}
      <View style={styles.content}>
        <Text style={[styles.placeholder, { color: theme.text.secondary }]}>Chat</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[2],
    paddingBottom: spacing[2],
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    fontSize: 18,
  },
});

