import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from 'layouts/MainLayout';
import AuthLayout from 'layouts/AuthLayout';

import { LoginPage, RecoverPasswordPage, ResetPasswordPage, LogoutPage, NotFound, Routes as RoutesCommon } from '@ppe/common';
import { useData } from 'DataContext';
import { useResourcePermissions } from 'hooks/useResourcePermissions';
import { useAuthentication } from '@ppe/authentication';
import { TeamsPage } from '@ppe/teams';
import { ProfilesPage } from '@ppe/profiles';
import { SitesPage } from '@ppe/sites';
import { ShiftsPage } from '@ppe/shifts';
import { PreferencesPage, PreferencesReplacementPage } from '@ppe/preferences';
import { CalendarParticipantPage, CalendarAdminPage } from '@ppe/events-calendars';
import { RoutePaths } from './Routes';
import { Resources } from 'constants/Resources';

const keyRecaptcha: string = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const keyMaps = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const AppRouter = () => {
  const dataSource = useData();
  const { initSession, closeSession, session } = useAuthentication();
  const userFullName = session ? `${session.firstName} ${session.lastName}` : '';
  const userId = session ? session.userId : '';

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate replace to={RoutePaths.DASHBOARD} />} />
          <Route
            path={RoutePaths.DASHBOARD}
            element={
              <CalendarParticipantPage dataSource={dataSource} permissions={useResourcePermissions(Resources.DASHBOARD_REPORT)} userId={userId} />
            }
          />
          <Route path={RoutePaths.SHIFTS} element={<ShiftsPage dataSource={dataSource} permissions={useResourcePermissions(Resources.SHIFTS)} />} />
          <Route path={RoutePaths.PREFERENCES} element={<PreferencesPage dataSource={dataSource} userId={session?.userId} />} />
          <Route
            path={RoutePaths.PREFERENCES_REPLACEMENT}
            element={<PreferencesReplacementPage dataSource={dataSource} userId={session?.userId} />}
          />
          <Route path={RoutePaths.TEAMS} element={<TeamsPage dataSource={dataSource} permissions={useResourcePermissions(Resources.TEAMS)} />} />
          <Route
            path={RoutePaths.PROFILES}
            element={<ProfilesPage dataSource={dataSource} permissions={useResourcePermissions(Resources.PROFILES)} />}
          />
          <Route
            path={RoutePaths.SITES}
            element={<SitesPage dataSource={dataSource} permissions={useResourcePermissions(Resources.SITES)} apiKeyMaps={keyMaps} />}
          />
          <Route
            path={RoutePaths.CALENDAR}
            element={<CalendarAdminPage dataSource={dataSource} permissions={useResourcePermissions(Resources.SHIFTS)} userFullName={userFullName} />}
          />
          <Route path={RoutesCommon.LOGOUT} element={<LogoutPage closeSession={closeSession} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path={RoutesCommon.LOGIN} element={<AuthLayout />}>
          <Route index element={<LoginPage dataSource={dataSource} initSession={initSession} />} />
          <Route path={RoutesCommon.RECOVER_PASSWORD} element={<RecoverPasswordPage dataSource={dataSource} apiKeyRecaptcha={keyRecaptcha} />} />
          <Route path={RoutesCommon.RESET_PASSWORD} element={<ResetPasswordPage dataSource={dataSource} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
