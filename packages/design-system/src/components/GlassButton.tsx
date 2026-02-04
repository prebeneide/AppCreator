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
import { BlurView } from 'expo-blur';
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
      return { color: theme.accent.primary };
    }
    if (variant === 'outline') {
      return { color: theme.accent.secondary };
    }
    return { color: theme.text.primary };
  };

  return (
    <View style={[getButtonStyle(), disabled && { opacity: 0.5 }, style]}>
      <BlurView
        intensity={15}
        style={[
          StyleSheet.absoluteFill,
          {
            borderRadius: radius.md,
            overflow: 'hidden',
          },
        ]}
        pointerEvents="none"
      />
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.7}
        style={[StyleSheet.absoluteFill, styles.touchable]}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variant === 'primary' ? theme.accent.primary : theme.text.primary}
          />
        ) : (
          <Text style={[styles.text, getTextStyle(), textStyle]}>{title}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  touchable: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    textAlign: 'center',
  },
});

