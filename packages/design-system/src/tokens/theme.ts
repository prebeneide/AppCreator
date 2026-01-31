import { colors } from './colors';

// Dark theme (primary) - livekit.io inspirert
export const darkTheme = {
  background: {
    primary: colors.black[900],
    secondary: colors.black[800],
    tertiary: colors.black[700],
  },
  surface: {
    primary: colors.black[800],
    secondary: colors.black[700],
    glass: 'rgba(33, 37, 41, 0.7)', // black[800] with opacity
  },
  text: {
    primary: '#ffffff',
    secondary: colors.black[200],
    tertiary: colors.black[400],
    inverse: colors.black[900],
  },
  accent: {
    primary: colors.brightCyan[500],
    secondary: colors.cyan[400],
    hover: colors.brightCyan[400],
  },
  border: {
    primary: colors.black[700],
    secondary: colors.black[600],
    accent: colors.cyan[500],
  },
  semantic: colors.semantic,
} as const;

// Light theme (secondary)
export const lightTheme = {
  background: {
    primary: '#ffffff',
    secondary: colors.black[50],
    tertiary: colors.black[100],
  },
  surface: {
    primary: '#ffffff',
    secondary: colors.black[50],
    glass: 'rgba(255, 255, 255, 0.7)',
  },
  text: {
    primary: colors.black[900],
    secondary: colors.black[700],
    tertiary: colors.black[500],
    inverse: '#ffffff',
  },
  accent: {
    primary: colors.brightCyan[600],
    secondary: colors.cyan[600],
    hover: colors.brightCyan[500],
  },
  border: {
    primary: colors.black[200],
    secondary: colors.black[300],
    accent: colors.cyan[600],
  },
  semantic: colors.semantic,
} as const;

export type Theme = typeof darkTheme;

