import React from 'react';
import { FormControlLabel, Switch, FormGroup, showToast, PlaceholderBox } from '@ppe/ui';
import { useTranslation } from '@ppe/translation';
import { IDataSource } from '../data/IDataSource';
import { useGeneralPreferences } from '../hooks/useGeneralPreferences';
import { useUpdateGeneralPreferences } from '../hooks/useUpdateGeneralPreferences';

interface Props {
  userId: string;
  dataSource: IDataSource;
}

export const ReplacementAvailabilitySwitcher = ({ userId, dataSource }: Props) => {
  const { t } = useTranslation();
  const { data, status: statusGetting, error: errorGetting } = useGeneralPreferences(dataSource, userId);
  const { update, status: statusUpdating, error: errorUpdating, reset } = useUpdateGeneralPreferences(dataSource);

  const isAvailable = data?.enableForReplacements;

  if (statusUpdating === 'success') {
    showToast(t('general.updatedSuccessfully', 'Updated successfully'), 'success');
    reset();
  }

  if (statusGetting === 'error') {
    showToast((errorGetting as Error).message, 'error');
  }

  if (statusUpdating === 'error') {
    showToast((errorUpdating as Error).message, 'error');
    reset();
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    update({ userId, values: { ...data, enableForReplacements: event.target.checked } });
  };

  if (isAvailable === undefined) return <PlaceholderBox />;

  return (
    <FormGroup sx={{ display: 'inline' }}>
      <FormControlLabel
        control={<Switch checked={isAvailable} onChange={handleChange} />}
        label={isAvailable ? t('preferences.enabledReplacement', 'Enabled') : t('preferences.disabledReplacement', 'Disabled')}
        disabled={statusGetting === 'loading' || statusUpdating === 'loading'}
      />
    </FormGroup>
  );
};
