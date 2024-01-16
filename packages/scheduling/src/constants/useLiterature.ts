import React from 'react';
import { useTranslation } from '@ppe/translation';

export const useLiterature = () => {
  const { t, i18n } = useTranslation();

  return React.useMemo(
    () => [
      { value: 'Books', label: t('literature.books', 'Books') },
      { value: 'Magazines', label: t('literature.magazines', 'Magazines') },
      { value: 'Brochure', label: t('literature.brochures', 'Brochures') },
      { value: 'Tract', label: t('literature.tracts', 'Tracts') },
      { value: 'Videos', label: t('literature.videos', 'Videos') },
    ],
    [i18n.language]
  );
};
