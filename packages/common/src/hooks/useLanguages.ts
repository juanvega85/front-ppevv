import { useTranslation } from '@ppe/translation';

export const useLanguages = () => {
  const { t, i18n } = useTranslation();
  const { languages } = i18n;

  return languages.map((item) => ({
    id: item,
    name: t(`language.${item}`),
  }));
};
