import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, useTheme, showToast } from '@ppe/ui';
import { useTranslation } from '@ppe/translation';
import { IDataSource } from '../data/IDataSource';
import { IRecoverPasswordData } from '../types/IRecoverPasswordData';
import { useRecoverPassword } from '../hooks/useRecoverPassword';
import { Routes } from '../routes';
import { RecoverPasswordForm } from '../components/RecoverPasswordForm/RecoverPasswordForm';

interface Props {
  dataSource: IDataSource;
  apiKeyRecaptcha: string;
}

export const RecoverPasswordPage = ({ dataSource, apiKeyRecaptcha }: Props) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { recoverPassword, status, error, reset } = useRecoverPassword(dataSource);

  const handleSubmit = (data: IRecoverPasswordData) => {
    recoverPassword(data);
  };

  React.useEffect(() => {
    if (status === 'success') {
      showToast(t('recoverPassword.success', 'Check your email'), 'success');
      reset();
      navigate(Routes.LOGIN, { replace: true });
    }

    if (status === 'error') {
      showToast(error.message, 'error');
      reset();
    }
  }, [status]);

  return (
    <>
      <RecoverPasswordForm onSend={handleSubmit} isLoading={status === 'loading'} apiKey={apiKeyRecaptcha} />
      <Box sx={{ mt: 3, textAlign: 'right' }}>
        <Link style={{ color: theme.palette.primary.main, textDecoration: 'none' }} to={Routes.LOGIN}>
          {t('recover.backToLogin', 'Back to login')}
        </Link>
      </Box>
    </>
  );
};
