/* eslint-disable import/no-named-as-default-member */
import { initReactI18next } from 'react-i18next';
import i18n, { Resource } from 'i18next';

export const getSettingsForTesting = (resources: Resource) => {
  const ns = ['common'];
  const supportedLngs = ['en', 'es'];

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

  return i18n;
};
