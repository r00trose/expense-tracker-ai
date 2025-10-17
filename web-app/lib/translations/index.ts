import { en } from './en';
import { tr } from './tr';
import type { Language } from '@/types/settings';

export const translations = {
  en,
  tr,
};

export function getTranslation(language: Language) {
  return translations[language];
}

export type { TranslationKeys } from './en';
