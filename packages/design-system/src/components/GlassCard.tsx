import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
// import { BlurView } from 'expo-blur';
import { useTheme } from '../utils/useTheme';
import { spacing, radius, elevation } from '../tokens';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  borderRadius?: keyof typeof radius;
}

export function GlassCard({
  children,
  style,
  intensity = 20,
  borderRadius = 'lg',
}: GlassCardProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          borderRadius: radius[borderRadius],
          backgroundColor: theme.surface.glass,
          borderColor: theme.border.primary,
          ...elevation[2],
        },
        style,
      ]}
    >
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    overflow: 'hidden',
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
});

