import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from '../tokens/theme';
import type { Theme } from '../tokens/theme';

export function useTheme(): Theme {
  const colorScheme = useColorScheme();
  return (colorScheme === 'dark' ? darkTheme : lightTheme) as Theme;
}

export function useIsDark(): boolean {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark';
}

