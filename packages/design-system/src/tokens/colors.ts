// Fargepalett inspirert av livekit.io: svart bakgrunn med skarplyseblå akcenter

export const colors = {
  // Base colors - svart tema
  black: {
    50: '#f8f9fa',
    100: '#e9ecef',
    200: '#dee2e6',
    300: '#ced4da',
    400: '#adb5bd',
    500: '#868e96',
    600: '#495057',
    700: '#343a40',
    800: '#212529',
    900: '#000000',
  },

  // Cyan/blue - skarplyseblå akcenter
  cyan: {
    50: '#e0f7fa',
    100: '#b2ebf2',
    200: '#80deea',
    300: '#4dd0e1',
    400: '#26c6da',
    500: '#00bcd4',
    600: '#00acc1',
    700: '#0097a7',
    800: '#00838f',
    900: '#006064',
  },

  // Bright cyan for highlights
  brightCyan: {
    400: '#00e5ff',
    500: '#00d4ff',
    600: '#00b8d4',
  },

  // Semantic colors
  semantic: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
} as const;

export type Colors = typeof colors;

