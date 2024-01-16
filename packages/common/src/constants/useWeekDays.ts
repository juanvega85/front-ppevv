import React from 'react';
import { useTranslation } from '@ppe/translation';

export const useWeekDays = () => {
  const { t, i18n } = useTranslation();

  return React.useMemo(
    () => [
      { id: '0Monday', name: t('days.monday', 'Monday') },
      { id: '1Tuesday', name: t('days.tuesday', 'Tuesday') },
      { id: '2Wednesday', name: t('days.wednesday', 'Wednesday') },
      { id: '3Thursday', name: t('days.thursday', 'Thursday') },
      { id: '4Friday', name: t('days.friday', 'Friday') },
      { id: '5Saturday', name: t('days.saturday', 'Saturday') },
      { id: '6Sunday', name: t('days.sunday', 'Sunday') },
    ],
    [i18n.language]
  );
};
