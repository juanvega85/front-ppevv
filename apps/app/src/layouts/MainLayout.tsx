import { AccountMenu, MainLayout as MainLayoutUi, SidebarMenu } from '@ppe/ui';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuthentication } from '@ppe/authentication';
import { Routes, AutoLogoutModal } from '@ppe/common';
import Footer from './Footer';
import { useIsFetching } from '@ppe/data-provider';
import { useSideBarMenuItems } from 'hooks/useSideBarMenuItems';
import { useAccountMenuItems } from 'hooks/useAccountMenuItems';

const APP_NAME = `${import.meta.env.VITE_APP_NAME}${import.meta.env.VITE_DATA_SOURCE === 'mocked' ? ' - [MOCKED]' : ''}`;
const APP_VERSION = import.meta.env.VITE_APP_VERSION;
const TIMEOUT_MINUTES = 30;
const TIMEOUT_MODAL_SECONDS = 30;

const MainLayout = () => {
  const { isAuthenticated, session } = useAuthentication();
  const navigate = useNavigate();

  const itemsSidebarMenu = useSideBarMenuItems();
  const itemsAccountMenu = useAccountMenuItems();
  const isFetching = useIsFetching();

  if (!isAuthenticated) {
    return <Navigate to={Routes.LOGIN} />;
  }

  const handleLogout = () => {
    navigate(Routes.LOGOUT);
  };

  const fullName = `${session?.firstName} ${session?.lastName}`;

  return (
    <MainLayoutUi
      sidebar={<SidebarMenu items={itemsSidebarMenu} />}
      appTitle={APP_NAME}
      header={<AccountMenu userName={fullName} items={itemsAccountMenu} isLoading={Boolean(isFetching)} />}
      version={APP_VERSION}
      footer={<Footer />}
    >
      <Outlet />
      <AutoLogoutModal timeOutMinutes={TIMEOUT_MINUTES} timerSeconds={TIMEOUT_MODAL_SECONDS} onLogout={handleLogout} />
    </MainLayoutUi>
  );
};

export default MainLayout;
