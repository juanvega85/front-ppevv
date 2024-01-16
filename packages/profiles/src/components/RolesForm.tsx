import React from 'react';
import { Box, SelectMultiple, LoadingButton, Loader, showToast } from '@ppe/ui';
import { useTranslation } from '@ppe/translation';
import { useUserRoles, useUpdateUserRoles, useAssignableRoles, IDataSource } from '@ppe/common';

interface Props {
  userId: string;
  onFinish?: () => void;
  dataSource: IDataSource;
}

export const RolesForm = ({ userId, onFinish, dataSource }: Props) => {
  const { t } = useTranslation();

  const [selectedRoles, setSelectedRoles] = React.useState<string[] | null>(null);
  const { data: userRoles, status: statusUserRoles } = useUserRoles(dataSource, userId);
  const { data: assignableRoles, status: statusAssignableRoles } = useAssignableRoles(dataSource);
  const { update, status: statusUpdate, error: errorUpdate, reset } = useUpdateUserRoles(dataSource);

  const handleSaveRoles = () => {
    if (selectedRoles) {
      update({ userId, data: selectedRoles });
    }
  };

  React.useEffect(() => {
    if (userRoles) {
      setSelectedRoles(userRoles);
    }
  }, [userRoles]);

  React.useEffect(() => {
    if (statusUpdate === 'success') {
      showToast(t('general.updatedSuccessfully', 'Updated successfully'), 'success');
      reset();
      onFinish?.();
    }
  }, [statusUpdate]);

  if (errorUpdate) {
    showToast((errorUpdate as Error).message, 'error');
    reset();
  }

  const isLoading = statusUserRoles === 'loading' || statusAssignableRoles === 'loading';

  return (
    <>
      {selectedRoles ? (
        <SelectMultiple
          name="roles"
          label={t('profile.roles', 'Roles')}
          options={assignableRoles?.map((item) => ({ value: item, label: t(`roles.${item}`) })) || []}
          onChange={setSelectedRoles}
          value={selectedRoles}
          size="small"
        />
      ) : (
        <Loader />
      )}
      <Box sx={{ mt: 2, textAlign: 'right' }}>
        <LoadingButton variant="contained" onClick={handleSaveRoles} loading={statusUpdate === 'loading'} disabled={isLoading}>
          {t('general.save', 'Save')}
        </LoadingButton>
      </Box>
    </>
  );
};
