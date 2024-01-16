import { useWeekDays, removeSeconds } from '@ppe/common';
import React from 'react';
import { useTranslation } from '@ppe/translation';
import { Grid, Box, Tab, TabContext, TabList, TabPanel, TextField, MenuItem, showToast, InputAdornment, LoadingButton, Notes } from '@ppe/ui';
import { FilterAlt as FilterIcon } from '@ppe/icons';
import { isAfter } from 'date-fns';
import { useProfilesByPreferences, ProfilesSelector, IProfile } from '@ppe/profiles';
import { IDataSource } from '../data/IDataSource';
import { ISite, SiteMap } from '@ppe/sites';
import { useCreateSchedule } from '../hooks/useCreateSchedule';
import { useShifts } from '@ppe/shifts';
import { useScheduleOverlapping } from '../hooks/useScheduleOverlapping';
import { ISchedule } from '../types/ISchedule';

type TabsType = 'profiles' | 'notes';
type SearchOptionsType = 'all' | 'permanent';

interface Props {
  site: ISite;
  onFinish?: () => void;
  dataSource: IDataSource;
  userFullName: string;
}

export const ScheduleForm = ({ site, onFinish, dataSource, userFullName }: Props) => {
  const { t } = useTranslation();
  const [range, setRange] = React.useState<string[]>(['', '']);
  const [dayOfTheWeek, setDayOfTheWeek] = React.useState('');
  const [selectedShift, setSelectedShift] = React.useState('');
  const [searchOption, setSearchOption] = React.useState<SearchOptionsType>('permanent');
  const [filter, setFilter] = React.useState('');
  const [selectedProfiles, setSelectedProfiles] = React.useState<string[]>([]);
  const [notes, setNotes] = React.useState<string[]>([]);

  const [profiles, setProfiles] = React.useState<IProfile[]>([]);

  const { create, status, reset } = useCreateSchedule(dataSource);

  const weekDays = useWeekDays();

  const { data: shifts, status: statusShifts } = useShifts(dataSource, { active: 'true', siteId: site.id, dayOfTheWeek });

  const { data: overlapping } = useScheduleOverlapping(dataSource, selectedShift, range[0], range[1]);

  const {
    data: searchedProfiles,
    status: statusSearchProfiles,
    refetch: fetchProfiles,
  } = useProfilesByPreferences(dataSource, selectedShift, searchOption);

  const [currentTab, setCurrentTab] = React.useState<TabsType>('profiles');

  const handleRangeChange = (value: string[]) => {
    setRange(value);
    setDayOfTheWeek('');
    setSelectedShift('');
    setProfiles([]);
    setSelectedProfiles([]);
    setFilter('');
  };

  const handleDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDayOfTheWeek(event.target.value);
    setSelectedShift('');
    setSelectedProfiles([]);
    setProfiles([]);
    setFilter('');
  };

  const handleShiftChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedShift(event.target.value);
    setSelectedProfiles([]);
    setProfiles([]);
    setFilter('');
  };

  const handleSearchOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOption(event.target.value as SearchOptionsType);
    setSelectedProfiles([]);
    setProfiles([]);
    setFilter('');
  };

  const searchProfiles = async () => {
    fetchProfiles();
    setProfiles(searchedProfiles);
  };

  const handleSave = async () => {
    const data: Omit<ISchedule, 'id' | 'shift'>[] = [
      {
        periodStartDay: range[0],
        periodEndDay: range[1],
        assigned: selectedProfiles.map((item) => ({ id: item })),
        notes,
      },
    ];

    create({ shiftId: selectedShift, data });
  };

  const isOverlapping = overlapping && overlapping.count > 0;

  React.useEffect(() => {
    if (status === 'success') {
      showToast(t('schedule.createdSuccessfully', 'Created successfully'), 'success');
      reset();
      onFinish?.();
    }
  }, [status]);

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
              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label={t('schedule.from', 'From')}
                    type="date"
                    onChange={(event) => handleRangeChange([event.target.value, range[1]])}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label={t('schedule.to', 'To')}
                    type="date"
                    onChange={(event) => handleRangeChange([range[0], event.target.value])}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    error={Boolean(range[0] && range[1] && !isAfter(new Date(range[1]), new Date(range[0])))}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    label={t('schedule.dayOfTheWeek', 'Day of the week')}
                    value={dayOfTheWeek}
                    onChange={handleDayChange}
                    fullWidth
                    disabled={!range[0] || !range[1] || !isAfter(new Date(range[1]), new Date(range[0]))}
                    size="small"
                  >
                    {weekDays.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    label={t('schedule.shift', 'Shift')}
                    value={selectedShift}
                    onChange={handleShiftChange}
                    fullWidth
                    disabled={!range || !dayOfTheWeek || statusShifts === 'loading'}
                    error={isOverlapping}
                    helperText={isOverlapping ? t('schedule.overlapping', 'There are coincidences') : null}
                    size="small"
                  >
                    {(shifts || [])
                      .sort((a, b) => (a.startTime > b.startTime ? 1 : -1))
                      .map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {removeSeconds(option.startTime)}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      select
                      label={t('schedule.profiles', 'Profiles')}
                      value={searchOption}
                      onChange={handleSearchOptionChange}
                      fullWidth
                      disabled={!selectedShift || isOverlapping}
                      size="small"
                    >
                      <MenuItem value="all">{t('schedule.all', 'All')}</MenuItem>
                      <MenuItem value="permanent">{t('schedule.withPreference', 'With this preference')}</MenuItem>
                    </TextField>
                    <LoadingButton
                      onClick={searchProfiles}
                      variant="contained"
                      disabled={!selectedShift || isOverlapping}
                      sx={{ ml: 2 }}
                      loading={statusSearchProfiles === 'loading'}
                    >
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
          <ProfilesSelector data={profiles} filter={filter} onChange={setSelectedProfiles} />
        </TabPanel>
        <TabPanel value="notes" sx={{ p: 0, pt: 3 }}>
          <Notes data={notes} onChange={setNotes} authorName={userFullName} />
        </TabPanel>
      </TabContext>

      <div style={{ textAlign: 'right' }}>
        <LoadingButton
          onClick={handleSave}
          variant="contained"
          loading={status === 'loading'}
          sx={{ mt: 2 }}
          disabled={!range || !dayOfTheWeek || !selectedShift || !selectedProfiles.length}
        >
          {t('general.save', 'Save')}
        </LoadingButton>
      </div>
    </>
  );
};
