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
import { LinearGradient } from 'expo-linear-gradient';
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

  const gradientColors =
    variant === 'primary'
      ? (['#FF6B9D', '#FF8E53', '#C084FC', '#00D4FF'] as const)
      : (['#3B82F6', '#8B5CF6', '#EC4899'] as const);

  return (
    <View style={[styles.wrapper, disabled && { opacity: 0.5 }, style]}>
      <LinearGradient
        colors={[...gradientColors]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradientBorder, { borderRadius: radius.md }]}
      >
        <View
          style={[
            styles.innerContainer,
            {
              borderRadius: radius.md - 1,
              backgroundColor: isDark
                ? 'rgba(0, 0, 0, 0.3)'
                : 'rgba(255, 255, 255, 0.2)',
            },
          ]}
        >
          <BlurView
            intensity={isDark ? 20 : 30}
            tint={isDark ? 'dark' : 'light'}
            style={[
              StyleSheet.absoluteFill,
              {
                borderRadius: radius.md - 1,
                overflow: 'hidden',
              },
            ]}
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
                color={variant === 'primary' ? '#00D4FF' : theme.text.primary}
              />
            ) : (
              <Text style={[styles.text, getTextStyle(), textStyle]}>{title}</Text>
            )}
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
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

