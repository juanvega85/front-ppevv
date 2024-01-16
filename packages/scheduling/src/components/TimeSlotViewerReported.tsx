import React from 'react';
import { Box, Tab, TabContext, TabList, TabPanel, Table, TableBody, TableCell, TableHead, TableRow, InfoField } from '@ppe/ui';
import { Check as CheckIcon, WarningAmber as WarningIcon } from '@ppe/icons';
import { useTranslation } from '@ppe/translation';
import { ITimeSlot } from '../types/ITimeSlot';
import { IShiftReport } from '../types/IShiftReport';
import { IProfile, ProfileButton } from '@ppe/profiles';

type TabsType = 'profiles' | 'report';

interface Props {
  timeSlot: ITimeSlot;
  report: IShiftReport;
}

export const TimeSlotViewerReported = ({ timeSlot, report }: Props) => {
  const [currentTab, setCurrentTab] = React.useState<TabsType>('profiles');
  const { t } = useTranslation();

  const isPresent = (profileId: string) => report.users.some((item) => item.id === profileId);

  const assigned = timeSlot.assigned as IProfile[];

  return (
    <TabContext value={currentTab}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={(_, value) => setCurrentTab(value as TabsType)} scrollButtons="auto" variant="scrollable">
          <Tab label={t('report.profiles', 'Profiles')} value="profiles" />
          <Tab label={t('report.report', 'Report')} value="report" />
        </TabList>
      </Box>
      <TabPanel value="profiles" sx={{ p: 0, pt: 3 }}>
        {assigned.map((item) => (
          <Box key={item.id} sx={{ mb: 1.5 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ProfileButton data={item} />
              {isPresent(item.id) ? <CheckIcon color="success" sx={{ ml: 2 }} /> : <WarningIcon color="warning" sx={{ ml: 2 }} />}
            </div>
          </Box>
        ))}
      </TabPanel>
      <TabPanel value="report" sx={{ p: 0, pt: 3 }}>
        <Table sx={{ mb: 4 }}>
          <TableHead>
            <TableRow>
              <TableCell>{t('report.item', 'Item')}</TableCell>
              <TableCell align="right">{t('report.quantity', 'Quantity')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(report.activity).map((item) => (
              <TableRow key={item[0]}>
                <TableCell component="th" scope="row">
                  {t(`literature.${item[0].toLowerCase()}`, item[0])}
                </TableCell>
                <TableCell align="right">{item[1]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {report.notes && <InfoField label={t('report.notes', 'Notes')} text={report.notes} />}
      </TabPanel>
    </TabContext>
  );
};
