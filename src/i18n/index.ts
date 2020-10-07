import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import translationKO from './ko.json';
import translationEN from './en.json';

export const initI18n = () => {
  i18n
    .use(detector)
    .use(initReactI18next)
    .init({
      detection: {
        order: ['path'],
        lookupFromPathIndex: 0
      },
      resources: {
        ko: {
          translation: translationKO
        },
        en: {
          translation: translationEN
        }
      },
      fallbackLng: 'ko',
      whitelist: ['ko', 'en'],
      initImmediate: false
    });
};
