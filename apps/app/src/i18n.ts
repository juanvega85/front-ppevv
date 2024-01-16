/* eslint-disable import/no-named-as-default-member */
import i18n from 'i18next';
import { initReactI18next } from '@ppe/translation';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: 'es',
    load: 'languageOnly',
    detection: {
      lookupLocalStorage: 'locale',
    },
    fallbackLng: ['en', 'es'],
    backend: {
      loadPath: import.meta.env.PROD ? 'locales/{{lng}}.json' : '../src/locales/{{lng}}.json',
    },
    keySeparator: false,
  });

export default i18n;
