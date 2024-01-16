import { IPermissions } from '@ppe/authentication';
import { useTranslation } from '@ppe/translation';
import { BoxTitled } from '@ppe/ui';
import { IDataSource } from '../data/IDataSource';
import { ProfileCrud } from './ProfileCrud';

interface Props {
  dataSource: IDataSource;
  permissions: IPermissions;
}

export const ProfilesPage = ({ dataSource, permissions }: Props) => {
  const { t } = useTranslation();

  return (
    <BoxTitled title={t('pages.profiles', 'Profiles')} sx={{ p: 0 }}>
      <ProfileCrud dataSource={dataSource} permissions={permissions} />
    </BoxTitled>
  );
};
