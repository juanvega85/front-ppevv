import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from '@ppe/translation';
import { Box, useTheme, showToast } from '@ppe/ui';
import { IDataSource } from '../data/IDataSource';
import { useResetPassword } from '../hooks/useResetPassword';
import { IResetPasswordData } from '../types/IResetPasswordData';
import { IResetPasswordSendData } from '../types/IResetPasswordSendData';
import { Routes } from '../routes';
import { ResetPasswordForm } from '../components/ResetPasswordForm/ResetPasswordForm';

interface Props {
  dataSource: IDataSource;
}

export const ResetPasswordPage = ({ dataSource }: Props) => {
  const { t } = useTranslation();
  const { resetPassword, status, reset, error } = useResetPassword(dataSource);
  const navigate = useNavigate();
  const theme = useTheme();

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const handleSend = (data: Omit<IResetPasswordData, 'confirmPassword'>) => {
    if (!token) return;
    const resetData: IResetPasswordSendData = {
      email: data.email,
      newPassword: data.password,
      oldPassword: token,
    };
    resetPassword(resetData);
  };

  if (!token) {
    navigate(Routes.LOGIN, { replace: true });
  }

  if (status === 'success') {
    showToast(t('resetPassword.success', 'Success reset password'), 'success');
    reset();
    navigate(Routes.LOGIN, { replace: true });
  }

  if (status === 'error') {
    showToast(error.message, 'error');
    reset();
  }

  return (
    <>
      <ResetPasswordForm onSend={handleSend} isLoading={status === 'loading'} />
      <Box sx={{ mt: 3, textAlign: 'right' }}>
        <Link style={{ color: theme.palette.primary.main, textDecoration: 'none' }} to={Routes.LOGIN}>
          {t('recover.backToLogin', 'Back to login')}
        </Link>
      </Box>
    </>
  );
};
