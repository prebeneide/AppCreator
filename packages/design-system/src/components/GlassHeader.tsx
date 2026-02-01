import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../utils/useTheme';
import { spacing, radius, typography, elevation } from '../tokens';
import { GlassCard } from './GlassCard';

interface GlassHeaderProps {
  title: string;
  subtitle?: string;
  rightComponent?: React.ReactNode;
  style?: ViewStyle;
}

export function GlassHeader({
  title,
  subtitle,
  rightComponent,
  style,
}: GlassHeaderProps) {
  const theme = useTheme();

  const cardStyle = StyleSheet.flatten([
    styles.container,
    {
      borderBottomWidth: 1,
      borderBottomColor: theme.border.primary,
      ...elevation[1],
    },
    style,
  ]);

  return (
    <GlassCard style={cardStyle} borderRadius="none">
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: theme.text.primary }]}>{title}</Text>
          {subtitle && (
            <Text style={[styles.subtitle, { color: theme.text.secondary }]}>
              {subtitle}
            </Text>
          )}
        </View>
        {rightComponent && <View style={styles.right}>{rightComponent}</View>}
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.tight * typography.fontSize.xl,
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    marginTop: spacing[1],
    lineHeight: typography.lineHeight.normal * typography.fontSize.sm,
  },
  right: {
    marginLeft: spacing[4],
  },
});

