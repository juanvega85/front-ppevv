import { IMenuList } from '@ppe/ui';
import {
  Home as HomeIcon,
  AccessTime as ShiftsIcon,
  Group as GroupIcon,
  Wc as ProfilesIcon,
  Event as CalendarIcon,
  LocationOn as LocationIcon,
} from '@ppe/icons';
import { useTranslation } from '@ppe/translation';
import { getResourcePermissions, useAuthentication } from '@ppe/authentication';
import { Resources } from '../constants/Resources';
import { RoutePaths } from 'routes/Routes';

export const useSideBarMenuItems = (): IMenuList[] => {
  const { t } = useTranslation();
  const { session } = useAuthentication();

  if (!session) return [];

  return [
    {
      items: [
        {
          text: t('sidebar.dashboard', 'Dashboard'),
          path: RoutePaths.DASHBOARD,
          icon: HomeIcon,
          hidden: !getResourcePermissions(Resources.DASHBOARD, session).canRead,
        },
      ],
    },
    {
      items: [
        {
          text: t('sidebar.profiles', 'Profiles'),
          path: RoutePaths.PROFILES,
          icon: ProfilesIcon,
          hidden: !getResourcePermissions(Resources.PROFILES, session).canRead,
        },
      ],
    },
    {
      items: [
        {
          text: t('sidebar.teams', 'Teams'),
          path: RoutePaths.TEAMS,
          icon: GroupIcon,
          hidden: !getResourcePermissions(Resources.TEAMS, session).canRead,
        },
      ],
    },
    {
      items: [
        {
          text: t('sidebar.sites', 'Sites'),
          path: RoutePaths.SITES,
          icon: LocationIcon,
          hidden: !getResourcePermissions(Resources.SITES, session).canRead,
        },
      ],
    },
    {
      items: [
        {
          text: t('sidebar.shifts', 'Shifts'),
          path: RoutePaths.SHIFTS,
          icon: ShiftsIcon,
          hidden: !getResourcePermissions(Resources.SHIFTS, session).canRead,
        },
      ],
    },
    {
      items: [
        {
          text: t('sidebar.calendar', 'Calendar'),
          path: RoutePaths.CALENDAR,
          icon: CalendarIcon,
          hidden: !getResourcePermissions(Resources.CALENDAR, session).canRead,
        },
      ],
    },
  ];
};
