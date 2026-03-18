import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, GlassButton, spacing } from '@appcreator/design-system';
import { useTranslation } from 'react-i18next';

interface PreviewScreenProps {
  onBack: () => void;
}

export default function PreviewScreen({ onBack }: PreviewScreenProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background.primary }]}
      edges={['top', 'bottom']}
    >
      <View style={[styles.header, { borderBottomColor: theme.border.primary }]}>
        <GlassButton
          title={t('button.cancel')}
          onPress={onBack}
          variant="secondary"
          style={styles.backButton}
        />
        <Text style={[styles.title, { color: theme.text.primary }]}>{t('preview.title')}</Text>
      </View>
      <View style={styles.content}>
        <Text style={[styles.placeholder, { color: theme.text.tertiary }]}>
          {t('preview.placeholder')}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
    gap: spacing[4],
  },
  backButton: {
    minWidth: 0,
    paddingHorizontal: spacing[3],
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing[6],
  },
  placeholder: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
});
