import React from 'react';
import { useTranslation } from '@ppe/translation';

export const useServiceCapacities = () => {
  const { t, i18n } = useTranslation();

  return React.useMemo(
    () => [
      { value: 'Unknown', label: t('serviceCapacity.unknown', 'Unknown') },
      // { value: 'Publisher', label: t('serviceCapacity.publisher', 'Publisher') },
      { value: 'Publisher', label: t('serviceCapacity.Publisher', 'Publisher') },
      { value: 'RegularPioneer', label: t('serviceCapacity.RegularPioneer', 'Regular Pionner') },
      { value: 'SpecialPioneer', label: t('serviceCapacity.SpecialPioneer', 'Special Pionner') },
      { value: 'Missionary', label: t('serviceCapacity.missionary', 'Missionary') },
      { value: 'AuxiliarPioneer', label: t('serviceCapacity.AuxiliarPioneer', 'Auxiliar Pionner') },
      { value: 'OtherFullTimeService', label: t('serviceCapacity.OtherFullTimeService', 'Other') },
    ],
    [i18n.language]
  );
};
