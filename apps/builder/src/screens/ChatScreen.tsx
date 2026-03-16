import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, GlassButton, spacing } from '@appcreator/design-system';
import { useTranslation } from 'react-i18next';

interface ChatScreenProps {
  onBack?: () => void;
}

export default function ChatScreen({ onBack }: ChatScreenProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const [input, setInput] = useState('');

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background.primary }]}
      edges={['top', 'bottom']}
    >
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.border.primary }]}>
        {onBack != null && (
          <GlassButton
            title={t('button.cancel')}
            onPress={onBack}
            variant="secondary"
            style={styles.backButton}
          />
        )}
        <Text style={[styles.title, { color: theme.text.primary }]}>{t('chat.title')}</Text>
      </View>

      {/* Message area */}
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          style={styles.messageList}
          contentContainerStyle={styles.messageListContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={[styles.emptyText, { color: theme.text.tertiary }]}>
            {t('chat.empty')}
          </Text>
        </ScrollView>

        {/* Input row */}
        <View style={[styles.inputRow, { backgroundColor: theme.background.secondary, borderTopColor: theme.border.primary }]}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.surface.primary,
                borderColor: theme.border.primary,
                color: theme.text.primary,
              },
            ]}
            placeholder={t('chat.placeholder')}
            placeholderTextColor={theme.text.tertiary}
            value={input}
            onChangeText={setInput}
            multiline
            maxLength={2000}
          />
          <GlassButton
            title={t('chat.send')}
            onPress={() => setInput('')}
            variant="primary"
            style={styles.sendButton}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
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
  messageList: {
    flex: 1,
  },
  messageListContent: {
    flexGrow: 1,
    padding: spacing[4],
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: spacing[4],
    gap: spacing[3],
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 100,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    fontSize: 16,
  },
  sendButton: {
    minWidth: 0,
    paddingHorizontal: spacing[4],
  },
});
