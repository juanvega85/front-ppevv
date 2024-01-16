import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from '@ppe/translation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton, showToast, TextField } from '@ppe/ui';
import { IDataSource } from '../data/IDataSource';
import { useCreateTeams } from '../hooks/useCreateTeams';
import { useUpdateTeams } from '../hooks/useUpdateTeams';
import { ITeam } from '../types/ITeam';

export interface Props {
  defaultValues?: ITeam;
  onFinish?: () => void;
  dataSource: IDataSource;
}

export const TeamForm = ({ defaultValues, onFinish, dataSource }: Props) => {
  const { t } = useTranslation();
  const currentId = defaultValues ? defaultValues.id : null;
  const editMode = currentId != null;

  const { create, status: statusCreate, error: errorCreate, reset: resetCreate } = useCreateTeams(dataSource);
  const { update, status: statusUpdate, error: errorUpdate, reset: resetUpdate } = useUpdateTeams(dataSource);

  const validationSchema = z.object({
    name: z.string().min(1, { message: t('validation.required', 'Required field') }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: zodResolver(validationSchema) });

  const onSubmit = (data: ITeam) => {
    if (editMode) {
      update([{ ...data, id: currentId }]);
    } else {
      create([data]);
    }
  };

  React.useEffect(() => {
    const isSuccess = statusUpdate === 'success' || statusCreate === 'success';
    if (isSuccess) {
      showToast(editMode ? t('team.updatedSuccessfully', 'Updated successfully') : t('team.createdSuccessfully', 'Created successfully'), 'success');
      onFinish?.();
    }
  }, [statusUpdate, statusCreate]);

  React.useEffect(() => {
    if (statusCreate === 'error') {
      showToast((errorCreate as Error).message, 'error');
      resetCreate();
    }
  }, [statusCreate]);

  React.useEffect(() => {
    if (statusUpdate === 'error') {
      showToast((errorUpdate as Error).message, 'error');
      resetUpdate();
    }
  }, [statusUpdate]);

  const isLoading = statusUpdate === 'loading' || statusCreate === 'loading';

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField
        {...register('name')}
        label={t('team.name', 'Name')}
        type="email"
        fullWidth
        error={Boolean(errors?.name)}
        helperText={errors?.name?.message}
        margin="normal"
        size="small"
      />
      <div style={{ textAlign: 'right' }}>
        <LoadingButton loading={isLoading} variant="contained" type="submit" sx={{ mt: 3 }}>
          {editMode ? t('general.update', 'Update') : t('general.create', 'Create')}
        </LoadingButton>
      </div>
    </form>
  );
};
