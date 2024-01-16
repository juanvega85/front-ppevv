import { BoxTitled } from '@ppe/ui';
import { useTranslation } from '@ppe/translation';
import { SiteCrud } from './SiteCrud';
import { IDataSource } from '../data/IDataSource';
import { IPermissions } from '@ppe/authentication';

interface Props {
  dataSource: IDataSource;
  permissions: IPermissions;
  apiKeyMaps: string;
}

export const SitesPage = ({ dataSource, permissions, apiKeyMaps }: Props) => {
  const { t } = useTranslation();

  return (
    <BoxTitled title={t('pages.sites', 'Sites')} sx={{ p: 0 }}>
      <SiteCrud dataSource={dataSource} permissions={permissions} apiKey={apiKeyMaps} />
    </BoxTitled>
  );
};
