import React from 'react';
import { useWeekDays } from '@ppe/common';
import { useTranslation } from '@ppe/translation';
import { Box, Grid, LoadingButton, showToast, Typography, Button } from '@ppe/ui';
import { ArrowCircleLeft as ArrowLeftIcon, ArrowCircleRight as ArrowRightIcon, Info as InfoIcon } from '@ppe/icons';
import { IDataSource } from '../data/IDataSource';
import { PreferencesType } from '../types/PreferencesType';
import { ISite, useSites, SitesToggleList } from '@ppe/sites';
import { useShiftsPreferences } from '../hooks/useShiftsPreferences';
import { useUpdateShiftsPreferences } from '../hooks/useUpdateShiftsPreferences';
import { IShift, DaysToggleList, ShiftsSelector } from '@ppe/shifts';

interface Props {
  type: PreferencesType;
  dataSource: IDataSource;
  userId: string;
}

export const ShiftsPreferences = ({ type, dataSource, userId }: Props) => {
  const nSteps = 3;
  const [stepMobile, setStepMobile] = React.useState(1);
  const { t } = useTranslation();

  const { data: sitesData, status: statusSites } = useSites(dataSource, { active: 'true' });
  const sites: ISite[] = sitesData ? sitesData.sort((a, b) => (a.name > b.name ? 1 : -1)) : [];

  const {
    shifts,
    shiftsSelected,
    sitesSelected,
    daysSelected,
    toggleSite,
    toggleDay,
    toggleShift,
    status: statusPreferences,
  } = useShiftsPreferences(dataSource, type, userId);
  const days = useWeekDays();

  const { update, status: statusUpdate, reset } = useUpdateShiftsPreferences(dataSource);

  const handleSave = async () => {
    const data: string[] = [];
    if (shifts) {
      shiftsSelected.forEach((item) => {
        const shift = shifts.find((s) => s.id === item);
        if (shift && isVisible(shift)) {
          data.push(item);
        }
      });
    }
    update({ userId, type, data });
  };

  const isVisible = (shift: IShift) => {
    return sitesSelected.includes(shift.site.id) && daysSelected.includes(shift.day);
  };

  if (statusSites === 'error') {
    showToast(t('error.loadingData', 'There was an error loading data'), 'error');
  }
  if (statusPreferences === 'error') {
    showToast(t('error.loadingData', 'There was an error loading data'), 'error');
  }

  if (statusUpdate === 'error') {
    showToast(t('error.updatingData', 'There was an error updating your data'), 'error');
  }

  if (statusUpdate === 'success') {
    showToast(t('general.updatedSuccessfully', 'Updated successfully'), 'success');
    reset();
  }

  const visibleShifts = shifts?.filter((item) => isVisible(item)) || [];

  return (
    <>
      <Grid container>
        <Grid item md={4} sx={{ px: 2 }} display={{ xs: stepMobile === 1 ? 'block' : 'none', md: 'block' }}>
          <Typography sx={{ fontWeight: 'bold', mb: 2 }} color="primary">
            {t('preferences.sites', 'Sites')}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <InfoIcon htmlColor="gray" fontSize="small" />
            <Typography variant="caption" color="gray" sx={{ ml: 1 }}>
              {t('preferences.sitesInfo', 'Select all the points you are available to assist to')}
            </Typography>
          </Box>

          <SitesToggleList
            loading={statusSites === 'loading' || statusPreferences === 'loading'}
            sites={sites}
            selected={sitesSelected}
            onChange={toggleSite}
          />
        </Grid>

        <Grid item md={4} sx={{ px: 2 }} display={{ xs: stepMobile === 2 ? 'block' : 'none', md: 'block' }}>
          <Typography sx={{ fontWeight: 'bold', mb: 2 }} color="primary">
            {t('preferences.days', 'Days of the week')}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <InfoIcon htmlColor="gray" fontSize="small" />
            <Typography variant="caption" color="gray" sx={{ ml: 1 }}>
              {t('preferences.daysInfo', 'Now select the days in wich you have availability')}
            </Typography>
          </Box>

          <DaysToggleList loading={statusPreferences === 'loading'} days={days} selected={daysSelected} onChange={toggleDay} />
        </Grid>

        <Grid item md={4} sx={{ px: 2 }} display={{ xs: stepMobile === 3 ? 'block' : 'none', md: 'block' }}>
          <Typography sx={{ fontWeight: 'bold', mb: 2 }} color="primary">
            {t('preferences.shifts', 'Shifts')}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <InfoIcon htmlColor="gray" fontSize="small" />
            <Typography variant="caption" color="gray" sx={{ ml: 1 }}>
              {t('preferences.shiftsInfo', 'Finally select all the options of shifts you want')}
            </Typography>
          </Box>

          <ShiftsSelector
            loading={statusSites === 'loading' || statusPreferences === 'loading'}
            data={visibleShifts}
            sites={sites}
            selected={shiftsSelected}
            onChange={toggleShift}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'space-between', py: 3 }}>
        <Button color="primary" disabled={stepMobile === 1} onClick={() => setStepMobile(stepMobile - 1)}>
          <ArrowLeftIcon fontSize="large" />
          <Typography variant="overline" sx={{ pl: 1 }}>
            {t('general.previous', 'Previous')}
          </Typography>
        </Button>
        <Button color="primary" disabled={stepMobile === nSteps} onClick={() => setStepMobile(stepMobile + 1)}>
          <Typography variant="overline" pr={1}>
            {t('general.next', 'Next')}
          </Typography>
          <ArrowRightIcon fontSize="large" />
        </Button>
      </Box>

      <Box sx={{ textAlign: 'right', display: { xs: stepMobile === nSteps ? 'block' : 'none', md: 'block' }, mt: 3 }}>
        <LoadingButton variant="contained" loading={statusUpdate === 'loading'} onClick={handleSave}>
          {t('general.save', 'Save')}
        </LoadingButton>
      </Box>
    </>
  );
};
