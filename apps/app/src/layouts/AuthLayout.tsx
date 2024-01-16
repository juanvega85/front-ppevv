import { AuthLayout as AuthLayoutUi } from '@ppe/ui';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthentication } from '@ppe/authentication';
import Footer from './Footer';
import { RoutePaths } from 'routes/Routes';

const APP_NAME = import.meta.env.VITE_APP_NAME;
const APP_VERSION = import.meta.env.VITE_APP_VERSION;

const AuthLayout = () => {
  const { isAuthenticated } = useAuthentication();

  if (isAuthenticated) {
    return <Navigate to={RoutePaths.DASHBOARD} />;
  }

  return (
    <AuthLayoutUi appName={APP_NAME} footer={<Footer />} version={APP_VERSION}>
      <Outlet />
    </AuthLayoutUi>
  );
};

export default AuthLayout;
