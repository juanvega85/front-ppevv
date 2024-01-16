import { getResourcePermissions, useAuthentication } from '@ppe/authentication';
import { useTranslation } from '@ppe/translation';
import { RoutePaths } from 'routes/Routes';
import { IAccountMenuItem } from '@ppe/ui';
import { Resources } from '../constants/Resources';

export const useAccountMenuItems = (): IAccountMenuItem[] => {
  const { t } = useTranslation();
  const { session } = useAuthentication();

  if (!session) return [];

  return [
    {
      text: t('userMenu.myPreferences', 'My preferences'),
      path: RoutePaths.PREFERENCES,
      hidden: !getResourcePermissions(Resources.PREFERENCES_PERMANENT, session).canRead,
    },
    {
      text: t('userMenu.myReplacementPreferences', 'My availabilty for replacements'),
      path: RoutePaths.PREFERENCES_REPLACEMENT,
      divider: true,
      hidden: !getResourcePermissions(Resources.PREFERENCES_TEMPORARY, session).canRead,
    },
    {
      text: t('userMenu.signOut', 'Sign out'),
      path: '/logout',
    },
  ];
};
