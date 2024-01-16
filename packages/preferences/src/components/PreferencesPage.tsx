import { useTranslation } from '@ppe/translation';
import { BoxTitled } from '@ppe/ui';
import { IDataSource } from '../data/IDataSource';
import { ShiftsPreferences } from './ShiftsPreferences';

interface Props {
  dataSource: IDataSource;
  userId?: string;
}

export const PreferencesPage = ({ dataSource, userId }: Props) => {
  const { t } = useTranslation();

  if (!userId) return null;

  return (
    <BoxTitled title={t('pages.myPreferences', 'My preferences')}>
      <ShiftsPreferences type="permanent" dataSource={dataSource} userId={userId} />
    </BoxTitled>
  );
};
