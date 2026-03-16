import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, GlassButton, spacing, radius } from '@appcreator/design-system';
import { useTranslation } from 'react-i18next';

interface ChatMessage {
  id: string;
  text: string;
  role: 'user';
}

interface ChatScreenProps {
  onBack?: () => void;
}

export default function ChatScreen({ onBack }: ChatScreenProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (messages.length > 0) {
      scrollRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages.length]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text: trimmed, role: 'user' as const },
    ]);
    setInput('');
  };

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
          ref={scrollRef}
          style={styles.messageList}
          contentContainerStyle={[
            styles.messageListContent,
            messages.length > 0 && styles.messageListContentWithMessages,
          ]}
          keyboardShouldPersistTaps="handled"
        >
          {messages.length === 0 ? (
            <Text style={[styles.emptyText, { color: theme.text.tertiary }]}>
              {t('chat.empty')}
            </Text>
          ) : (
            messages.map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.bubble,
                  {
                    backgroundColor: theme.accent.primary + '22',
                    borderColor: theme.accent.primary + '44',
                    alignSelf: 'flex-end',
                  },
                ]}
              >
                <Text style={[styles.bubbleText, { color: theme.text.primary }]}>{msg.text}</Text>
              </View>
            ))
          )}
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
            onPress={handleSend}
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
  messageListContentWithMessages: {
    justifyContent: 'flex-start',
    paddingBottom: spacing[4],
  },
  bubble: {
    maxWidth: '85%',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    borderRadius: radius.lg,
    borderWidth: 1,
    marginBottom: spacing[3],
  },
  bubbleText: {
    fontSize: 15,
    lineHeight: 22,
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
