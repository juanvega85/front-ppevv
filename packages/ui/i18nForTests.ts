/* eslint-disable import/no-named-as-default-member */
import { initReactI18next } from '@ppe/translation';
import i18n from 'i18next';
import en from './locales/en.json';
import es from './locales/es.json';

const ns = ['common'];
const supportedLngs = ['en', 'es'];
const resources = {
  en: { common: en },
  es: { common: es },
};

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
  defaultNS: 'common',
  ns,
  keySeparator: false,
  supportedLngs,
  resources,
});

export default i18n;
