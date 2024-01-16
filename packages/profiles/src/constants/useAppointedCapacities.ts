import React from 'react';
import { useTranslation } from '@ppe/translation';

export const useAppointedCapacities = () => {
  const { t, i18n } = useTranslation();

  return React.useMemo(
    () => [
      { value: 'Unknown', label: t('appointment.unknown', 'Unknown') },
      { value: 'None', label: t('appointment.none', 'None') },
      { value: 'MinisterialServant', label: t('appointment.ministerial-servant', 'Ministerial Servant') },
      { value: 'MinisterialServant', label: t('appointment.ministerialservant', 'Ministerial Servant') },
      { value: 'Elder', label: t('appointment.elder', 'Elder') },
    ],
    [i18n.language]
  );
};
