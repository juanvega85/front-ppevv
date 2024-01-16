import { CalendarParticipant } from './CalendarParticipant';
import { useTranslation } from '@ppe/translation';
import { BoxTitled } from '@ppe/ui';
import { IDataSource } from '../data/IDataSource';
import { IPermissions } from '@ppe/authentication';

interface Props {
  dataSource: IDataSource;
  permissions: IPermissions;
  userId: string;
}

export const CalendarParticipantPage = ({ dataSource, permissions, userId }: Props) => {
  const { t } = useTranslation();
  const { canRead } = permissions;

  return (
    <BoxTitled title={t('pages.dashboard', 'Dashboard')}>
      {canRead && <CalendarParticipant dataSource={dataSource} permissions={permissions} userId={userId} />}
    </BoxTitled>
  );
};
