import React from 'react';
import { useTranslation } from '@ppe/translation';

export const useLanguageOptions = () => {
  const { t, i18n } = useTranslation();

  return React.useMemo(
    () => [
      { value: 'Spanish', label: t('language.spanish', 'Spanish') },
      { value: 'English', label: t('language.english', 'English') },
      { value: 'Arabic', label: t('language.arabic', 'Arabic') },
      { value: 'Chinese', label: t('language.chinese', 'Chinese') },
      { value: 'Mapudungun', label: t('language.mapudungun', 'Mapudungun') },
      { value: 'Japanese', label: t('language.japanese', 'Japanese') },
      { value: 'German', label: t('language.german', 'German') },
      { value: 'French', label: t('language.french', 'French') },
      { value: 'HatianCreole', label: t('language.hatian-creole', 'Hatian creole') },
      { value: 'Korean', label: t('language.korean', 'Korean') },
      { value: 'Portuguese', label: t('language.portuguese', 'Portuguese') },
      { value: 'ChileanSign', label: t('language.chilean-sign', 'Chilean sign') },
      { value: 'Aymara', label: t('language.aymara', 'Aymara') },
      { value: 'Hindi', label: t('language.hindi', 'Hindi') },
      { value: 'Italian', label: t('language.italian', 'Italian') },
      { value: 'Quechua', label: t('language.quechua', 'Quechua') },
      { value: 'Quichua', label: t('language.quichua', 'Quichua') },
      { value: 'Romani', label: t('language.romani', 'Romani') },
      { value: 'Russian', label: t('language.russian', 'Russian') },
    ],
    [i18n.language]
  );
};
