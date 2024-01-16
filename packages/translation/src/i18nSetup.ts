/* eslint-disable import/no-named-as-default-member */
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from 'i18next';

export const i18nSetup = (loadPath: string) => {
  i18n
    .use(LanguageDetector)
    .use(Backend)
    .use(initReactI18next)
    .init({
      load: 'languageOnly',
      detection: {
        lookupLocalStorage: 'locale',
      },
      fallbackLng: ['en', 'es'],
      backend: {
        loadPath,
      },
      keySeparator: false,
    });

  return i18n;
};
