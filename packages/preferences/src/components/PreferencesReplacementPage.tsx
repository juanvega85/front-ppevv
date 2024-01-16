import { ReplacementAvailabilitySwitcher } from './ReplacementAvailabilitySwitcher';
import { Box, BoxTitled } from '@ppe/ui';
import { useTranslation } from '@ppe/translation';
import { ShiftsPreferences } from './ShiftsPreferences';
import { IDataSource } from '../data/IDataSource';

interface Props {
  dataSource: IDataSource;
  userId?: string;
}

export const PreferencesReplacementPage = ({ dataSource, userId }: Props) => {
  const { t } = useTranslation();

  if (!userId) return null;

  return (
    <BoxTitled title={t('pages.myAvailabilityReplacements', 'My availability for replacements')}>
      <Box mb={3}>{Boolean(userId) && <ReplacementAvailabilitySwitcher userId={userId} dataSource={dataSource} />}</Box>
      <ShiftsPreferences type="temporary" dataSource={dataSource} userId={userId} />
    </BoxTitled>
  );
};
