import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './locales/en/common.json';
import nb from './locales/nb/common.json';

export const LANGUAGE_STORAGE_KEY = 'appcreator.language';

const resources = {
  en: {
    translation: en,
  },
  nb: {
    translation: nb,
  },
};

const deviceLang = Localization.getLocales()[0]?.languageCode?.startsWith('nb') ? 'nb' : 'en';

i18n.use(initReactI18next).init({
  resources,
  lng: deviceLang,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v4',
});

export async function getStoredLanguage(): Promise<'en' | 'nb' | null> {
  const stored = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored === 'en' || stored === 'nb') return stored;
  return null;
}

export async function setStoredLanguage(lang: 'en' | 'nb'): Promise<void> {
  await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
}

export default i18n;
