import React from 'react';
import { useTranslation } from '@ppe/translation';
import {
  Grid,
  Box,
  Tab,
  TabContext,
  TabList,
  TabPanel,
  TextField,
  MenuItem,
  showToast,
  InputAdornment,
  LoadingButton,
  Button,
  Typography,
  Modal,
  Loader,
  Divider,
  Notes,
  SplitButton,
} from '@ppe/ui';
import { FilterAlt as FilterIcon, AltRoute as ChangedIcon } from '@ppe/icons';
import { format, parseISO } from 'date-fns';
import en from 'date-fns/locale/en-US';
import es from 'date-fns/locale/es';
import { ReportForm } from './ReportForm';
import { IDataSource } from '../data/IDataSource';
import { ProfilesSelector, IProfile, useProfilesByPreferences } from '@ppe/profiles';
import { ITimeSlot } from '../types/ITimeSlot';
import { useSchedule } from '../hooks/useSchedule';
import { useRestoreScheduleException } from '../hooks/useRestoreScheduleException';
import { useSetScheduleException } from '../hooks/useSetScheduleException';
import { useUpdateSchedule } from '../hooks/useUpdateSchedule';
import { ISite, SiteMap } from '@ppe/sites';
import { IShift } from '@ppe/shifts';

type SearchOptionsType = 'all' | 'permanent' | 'temporary';
type TabsType = 'profiles' | 'notes';
const ONLY_THIS = 'Save this';
const ALL_SERIES = 'Save serie';

interface Props {
  timeSlot: ITimeSlot;
  isPast: boolean;
  onFinish?: () => void;
  dataSource: IDataSource;
  userFullName: string;
}

export const TimeSlotEditor = ({ timeSlot, isPast, onFinish, dataSource, userFullName }: Props) => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;

  const [openReport, setOpenReport] = React.useState(false);
  const toggleReport = () => setOpenReport(!openReport);

  const [currentTab, setCurrentTab] = React.useState<TabsType>('profiles');

  const [profiles, setProfiles] = React.useState<IProfile[]>(timeSlot.assigned as IProfile[]);
  const [searchOption, setSearchOption] = React.useState<SearchOptionsType>('permanent');
  const [filter, setFilter] = React.useState('');
  const [selectedProfiles, setSelectedProfiles] = React.useState<string[]>(timeSlot.assigned.map((item) => item.id));

  const [notes, setNotes] = React.useState(timeSlot.notes);

  const [hasChanged, setHasChanged] = React.useState(false);

  const { data: schedule, status: statusSchedule } = useSchedule(dataSource, timeSlot.schedule.id, timeSlot.shift.id);

  const { restore, status: statusRestore } = useRestoreScheduleException(dataSource);
  const { update: updateException, status: statusUpdateException } = useSetScheduleException(dataSource);
  const { update: updateSeries, status: statusUpdateSeries } = useUpdateSchedule(dataSource);

  const {
    data: searchedProfiles,
    status: statusSearchProfiles,
    refetch: fetchProfiles,
  } = useProfilesByPreferences(dataSource, timeSlot.shift.id, searchOption);

  const searchProfiles = async () => {
    setSelectedProfiles(timeSlot.assigned.map((item) => item.id));
    setProfiles(timeSlot.assigned as IProfile[]);
    setFilter('');

    fetchProfiles();
    setProfiles(searchedProfiles);
  };

  const handleReset = () => {
    restore({ shiftId: timeSlot.shift.id, timeSlotId: timeSlot.id });
    onFinish?.();
  };

  const handleSave = (type: string) => {
    const shiftId = timeSlot.shift.id;
    console.log(selectedProfiles)
    // const assigned = profiles.filter((item) => selectedProfiles.includes(item.id));
    const assigned = selectedProfiles.map( x => {return {id: x}});
    console.log('Los asignados son');
    console.log(assigned);
    if (type === ONLY_THIS) {
      const data = [{ ...timeSlot, assigned, notes, shift: { id: shiftId } }];
      updateException({ shiftId, data });
    } else if (type === ALL_SERIES && schedule) {
      const data = [{ ...schedule, assigned, notes }];
      updateSeries({ shiftId, data });
    }
  };

  React.useEffect(() => {
    if (statusUpdateException === 'success' || statusUpdateSeries === 'success') {
      showToast(t('schedule.savedSuccessfully', 'Saved successfully'), 'success');
      onFinish?.();
    }
  }, [statusUpdateException, statusUpdateSeries]);

  const locale = language === 'es' ? es : en;
  const startDate = schedule ? format(parseISO(`${schedule.periodStartDay}`), 'dd MMM yyyy', { locale }) : '';
  const endDate = schedule ? format(parseISO(`${schedule.periodEndDay}`), 'dd MMM yyyy', { locale }) : '';

  const getHasChanged = () => {
    const originalAssigned = timeSlot.assigned.map((item) => item.id).sort();
    const originalNotes = timeSlot.notes.sort();

    if (originalAssigned.length !== selectedProfiles.length || originalNotes.length !== notes.length) return true;

    originalAssigned.forEach((item, index) => {
      if (item !== selectedProfiles.sort()[index]) return true;
    });

    originalNotes.forEach((item, index) => {
      if (item !== notes.sort()[index]) return true;
    });

    return false;
  };

  React.useEffect(() => {
    if (statusSearchProfiles === 'error') {
      setProfiles([]);
      showToast(t('error.loadingData', 'There was an error loading data'), 'error');
      return;
    }
    if (statusSearchProfiles === 'success') {
      setProfiles(searchedProfiles);
    }
  }, [searchedProfiles, statusSearchProfiles]);

  React.useEffect(() => {
    setHasChanged(getHasChanged());
  }, [selectedProfiles, notes]);

  if (statusSchedule === 'loading') {
    return <Loader />;
  }

  const shift = timeSlot.shift as IShift;
  const site = shift.site as ISite;

  return (
    <>
      <TabContext value={currentTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={(_, value) => setCurrentTab(value as TabsType)} scrollButtons="auto" variant="scrollable">
            <Tab label={t('schedule.profiles', 'Profiles')} value="profiles" />
            <Tab label={`${t('schedule.notes', 'Notes')}${notes.length ? ` (${notes.length})` : ''}`} value="notes" />
          </TabList>
        </Box>
        <TabPanel value="profiles" sx={{ p: 0, pt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {schedule && (
                    <Typography mb={2} component="div">
                      <b>{`${t('schedule.assignmentRange', 'Assignment range')}:`}</b>
                      <div>{`${startDate} - ${endDate}`}</div>
                    </Typography>
                  )}

                  {timeSlot.isException && (
                    <Box sx={{ display: 'flex', my: 2, alignItems: 'center' }}>
                      <ChangedIcon />
                      <Typography variant="caption" sx={{ mx: 1 }}>
                        {t('schedule.changedMessage', 'This assignmet was modified for this day, but you can restore it')}
                      </Typography>
                      <LoadingButton variant="outlined" onClick={handleReset} loading={statusRestore === 'loading'} sx={{ px: { xs: 4, md: 2 } }}>
                        {t('schedule.reset', 'Reset')}
                      </LoadingButton>
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      select
                      label={t('schedule.profiles', 'Profiles')}
                      value={searchOption}
                      onChange={(e) => setSearchOption(e.target.value as SearchOptionsType)}
                      fullWidth
                      size="small"
                    >
                      <MenuItem value="all">{t('schedule.all', 'All')}</MenuItem>
                      <MenuItem value="permanent">{t('schedule.withPreference', 'With this preference')}</MenuItem>
                      <MenuItem value="temporary">{t('schedule.availableReplacement', 'Available for replacement')}</MenuItem>
                    </TextField>
                    <LoadingButton onClick={searchProfiles} variant="contained" sx={{ ml: 2 }} loading={statusSearchProfiles === 'loading'}>
                      {t('schedule.search', 'Search')}
                    </LoadingButton>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FilterIcon />
                        </InputAdornment>
                      ),
                    }}
                    type="search"
                    value={filter}
                    onChange={(event: any) => setFilter(event.target.value.toLowerCase())}
                    fullWidth
                    placeholder={t('schedule.filterPlaceholder', 'Filter by name or team')!}
                    label={t('schedule.filter', 'Filter')}
                    size="small"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <SiteMap position={site.coordinates} storage={site.storage} />
            </Grid>
          </Grid>
          <ProfilesSelector data={profiles} filter={filter} initialSelected={timeSlot.assigned as IProfile[]} onChange={setSelectedProfiles} />
        </TabPanel>
        <TabPanel value="notes" sx={{ p: 0, py: 3 }}>
          <Notes data={notes} onChange={setNotes} authorName={userFullName} />
        </TabPanel>
      </TabContext>

      <Divider sx={{ pt: 3 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, alignItems: 'center' }}>
        {isPast ? (
          <Button onClick={() => setOpenReport(true)} variant="contained">
            {t('schedule.report', 'Report')}
          </Button>
        ) : (
          <div />
        )}
        <div>
          {timeSlot.isException ? (
            <LoadingButton
              onClick={() => handleSave(ONLY_THIS)}
              variant="contained"
              loading={statusUpdateException === 'loading' || statusUpdateSeries === 'loading'}
              disabled={statusUpdateException === 'loading' || !hasChanged}
              size="small"
            >
              {t('general.save', 'Save')}
            </LoadingButton>
          ) : (
            <SplitButton
              onClick={(value) => handleSave(value)}
              options={[ONLY_THIS, ALL_SERIES]}
              loading={statusUpdateException === 'loading' || statusUpdateSeries === 'loading'}
              disabled={statusUpdateException === 'loading' || !hasChanged}
            />
          )}
        </div>
      </Box>
      <Modal open={openReport} onClose={toggleReport} title={t('report.createNew', 'Create report')} size="xs">
        <ReportForm
          timeSlot={timeSlot}
          dataSource={dataSource}
          onFinish={() => {
            toggleReport();
            onFinish?.();
          }}
        />
      </Modal>
    </>
  );
};
