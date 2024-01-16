import React from 'react';
import { useTranslation } from '@ppe/translation';

export const useMaritalStatuses = () => {
  const { t, i18n } = useTranslation();

  return React.useMemo(
    () => [
      { value: 'Single', label: t('maritalStatus.single', 'Single') },
      { value: 'Married', label: t('maritalStatus.married', 'Married') },
      { value: 'Widowed', label: t('maritalStatus.widowed', 'Widowed') },
      { value: 'Separated', label: t('maritalStatus.separated', 'Separated') },
      { value: 'Divorced', label: t('maritalStatus.divorced', 'Divorced') },
    ],
    [i18n.language]
  );
};
