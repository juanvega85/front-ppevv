import React from 'react';
import { useTranslation } from '@ppe/translation';

export const useGenders = () => {
  const { t, i18n } = useTranslation();

  return React.useMemo(
    () => [
      { value: 'Male', label: t('gender.male', 'Male') },
      { value: 'Female', label: t('gender.female', 'Female') },
    ],
    [i18n.language]
  );
};
