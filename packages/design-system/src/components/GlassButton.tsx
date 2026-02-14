import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
// import { BlurView } from 'expo-blur';
// import { LinearGradient } from 'expo-linear-gradient';
import { useTheme, useIsDark } from '../utils/useTheme';
import { spacing, radius, typography } from '../tokens';

interface GlassButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function GlassButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
}: GlassButtonProps) {
  const theme = useTheme();
  const isDark = useIsDark();

  const getButtonStyle = (): ViewStyle => {
    const base: ViewStyle = {
      borderRadius: radius.md,
      borderWidth: 1,
      paddingVertical: spacing[3],
      paddingHorizontal: spacing[4],
      minHeight: 44,
      justifyContent: 'center',
      alignItems: 'center',
    };

    if (variant === 'primary') {
      return {
        ...base,
        backgroundColor: theme.surface.glass,
        borderColor: theme.accent.primary,
      };
    }

    if (variant === 'secondary') {
      return {
        ...base,
        backgroundColor: theme.surface.glass,
        borderColor: theme.border.primary,
      };
    }

    return {
      ...base,
      backgroundColor: 'transparent',
      borderColor: theme.border.accent,
    };
  };

  const getTextStyle = (): TextStyle => {
    if (variant === 'primary') {
      return { color: '#FFFFFF' };
    }
    if (variant === 'outline') {
      return { color: theme.accent.secondary };
    }
    return { color: theme.text.primary };
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[
        styles.wrapper,
        {
          backgroundColor: isDark ? 'rgba(0, 212, 255, 0.2)' : 'rgba(0, 212, 255, 0.1)',
          borderWidth: 2,
          borderColor: '#00D4FF',
          borderRadius: radius.md,
          paddingVertical: spacing[3],
          paddingHorizontal: spacing[4],
          minHeight: 44,
          justifyContent: 'center',
          alignItems: 'center',
        },
        disabled && { opacity: 0.5 },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? '#00D4FF' : theme.text.primary}
        />
      ) : (
        <Text style={[styles.text, getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    minHeight: 44,
  },
  gradientBorder: {
    padding: 1.5,
  },
  innerContainer: {
    minHeight: 42,
    overflow: 'hidden',
  },
  touchable: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
  },
  text: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    textAlign: 'center',
  },
});

