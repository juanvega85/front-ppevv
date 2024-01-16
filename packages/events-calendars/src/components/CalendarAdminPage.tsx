import { CalendarAdmin } from './CalendarAdmin';
import { useTranslation } from '@ppe/translation';
import { BoxTitled } from '@ppe/ui';
import { IDataSource } from '../data/IDataSource';
import { IPermissions } from '@ppe/authentication';

interface Props {
  dataSource: IDataSource;
  permissions: IPermissions;
  userFullName?: string;
}

export const CalendarAdminPage = ({ dataSource, permissions, userFullName = '' }: Props) => {
  const { t } = useTranslation();

  return (
    <BoxTitled title={t('pages.calendar', 'Calendar')} sx={{ p: 0 }}>
      <CalendarAdmin dataSource={dataSource} permissions={permissions} userFullName={userFullName} />
    </BoxTitled>
  );
};

export default CalendarAdminPage;
