import { Box, useTheme, showToast, Modal } from '@ppe/ui';
import { Link } from 'react-router-dom';
import { useTranslation } from '@ppe/translation';
import { IDataSource } from '../data/IDataSource';
import { ILoginData } from '../types/ILoginData';
import { useLogin } from '../hooks/useLogin';
import { LoginForm } from '../components/LoginForm/LoginForm';
import { TenantSelector } from '../components/TenantSelector/TenantSelector';
import { Routes } from '../routes';
import { ISession } from '@ppe/authentication';

interface Props {
  dataSource: IDataSource;
  initSession: (token: string, data: ISession) => void;
}

export const LoginPage = ({ dataSource, initSession }: Props) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { login, status, isLoading, tenants, reset, handleSetTenant } = useLogin(dataSource, initSession);

  const handleSend = (data: ILoginData) => {
    login(data);
  };

  if (status === 'success') {
    showToast(t('login.success', 'Success login'), 'success');
  }

  return (
    <>
      <LoginForm onSend={handleSend} isLoading={isLoading} />
      <Box sx={{ mt: 3, textAlign: 'right' }}>
        <Link style={{ color: theme.palette.primary.main, textDecoration: 'none' }} to={Routes.RECOVER_PASSWORD}>
          {t('login.forgotPassword', 'Forgot password')}
        </Link>
      </Box>
      <Modal title={t('login.selectTenant', 'Select tenant')} open={Boolean(tenants)} onClose={reset} size="xs">
        <TenantSelector data={tenants} onSelect={(value) => handleSetTenant(value)} />
      </Modal>
    </>
  );
};
