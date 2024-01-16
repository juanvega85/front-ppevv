import { IPermissions } from '@ppe/authentication';
import { useTranslation } from '@ppe/translation';
import { BoxTitled } from '@ppe/ui';
import { IDataSource } from '../data/IDataSource';
import { TeamCrud } from './TeamCrud';

export interface Props {
  dataSource: IDataSource;
  permissions: IPermissions;
}

export const TeamsPage = ({ dataSource, permissions }: Props) => {
  const { t } = useTranslation();

  return (
    <BoxTitled title={t('pages.teams', 'Teams')} sx={{ p: 0 }}>
      <TeamCrud dataSource={dataSource} permissions={permissions} />
    </BoxTitled>
  );
};
