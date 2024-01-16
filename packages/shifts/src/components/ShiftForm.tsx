import React from 'react';
import { Box, Button, ConfirmDialog, Divider, Grid, LoadingButton, showToast, TextField, Typography } from '@ppe/ui';
import { useTranslation } from '@ppe/translation';
import { useWeekDays } from '@ppe/common';
import { IDataSource } from '../data/IDataSource';
import { ISite, SitesToggleList } from '@ppe/sites';
import { useCreateShifts } from '../hooks/useCreateShifts';
import { IShift } from '../types/IShift';
import { DaysToggleList } from './DaysToggleList';

interface Props {
  sites?: ISite[];
  onCloseDialog?: () => void;
  dataSource: IDataSource;
}

const MIN_HOURS = '05:00';

export const ShiftForm = ({ sites, onCloseDialog, dataSource }: Props) => {
  const singleSite = sites?.length === 1;
  const [sitesSelected, setSitesSelected] = React.useState<string[]>(singleSite ? [sites[0].id] : []);
  const [daysSelected, setDaysSelected] = React.useState<string[]>([]);
  const [durationHours, setDurationHours] = React.useState(0);
  const [durationMinutes, setDurationMinutes] = React.useState(0);
  const [startTime, setStartTime] = React.useState<string>(MIN_HOURS);
  const { create, status: statusCreateShifts } = useCreateShifts(dataSource);
  const [newItemsToAdd, setNewItemsToAdd] = React.useState<Omit<IShift, 'id'>[]>([]);
  const days = useWeekDays();

  const { t } = useTranslation();

  const isSelectedSite = (id: string) => sitesSelected.includes(id);
  const isSelectedDay = (id: string) => daysSelected.includes(id);

  const isValidStartTime = () => {
    const hour = parseInt(startTime.split(':')[0]);
    const minHour = parseInt(MIN_HOURS.split(':')[0]);
    if (hour < minHour || isNaN(hour!)) return false;
    return true;
  };

  const handleChangeDurationHours = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const time = parseInt(value);
    if (isNaN(time) || time > 23 || time < 0) {
      setDurationHours(0);
    } else {
      setDurationHours(time);
    }
  };

  const handleChangeDurationMinutes = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const time = parseInt(value);
    if (isNaN(time) || time > 59 || time < 0) {
      setDurationMinutes(0);
    } else {
      setDurationMinutes(time);
    }
  };

  const handleSiteChange = (id: string, value: boolean) => {
    if (value && !isSelectedSite(id)) {
      setSitesSelected([...sitesSelected, id]);
    } else {
      setSitesSelected(sitesSelected.filter((item) => item !== id));
    }
  };

  const handleDayChange = (id: string, value: boolean) => {
    if (value && !isSelectedDay(id)) {
      setDaysSelected([...daysSelected, id]);
    } else {
      setDaysSelected(daysSelected.filter((item) => item !== id));
    }
  };

  const handleNews = () => {
    const newShifts: Omit<IShift, 'id'>[] = [];
    sitesSelected.forEach((siteItem) => {
      daysSelected.forEach((dayItem) => {
        const hourDuration = durationHours.toString().padStart(2, '0');
        const minuteDuration = durationMinutes.toString().padStart(2, '0');
        newShifts.push({
          day: dayItem,
          site: {
            id: siteItem,
          },
          startTime,
          duration: `${hourDuration}:${minuteDuration}`,
          active: true,
        });
      });
    });
    setNewItemsToAdd(newShifts);
  };

  const handleCreate = () => {
    create(newItemsToAdd, {
      onSuccess: () => {
        setSitesSelected([]);
        setDaysSelected([]);
        setDurationHours(0);
        setDurationMinutes(0);
        setStartTime(MIN_HOURS);
        onCloseDialog && onCloseDialog();
        showToast(t('shifts.createSuccess', 'New shifts have been created successfully'), 'success');
      },
      onError: (error) => {
        showToast((error as Error).message, 'error');
      },
      onSettled: () => {
        setNewItemsToAdd([]);
      },
    });
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={6} lg={7}>
          <Typography sx={{ mb: 2, fontWeight: 'bold' }} color="primary">
            {t('shifts.sites', 'Sites')}
          </Typography>
          <SitesToggleList sites={sites || []} selected={sitesSelected} onChange={handleSiteChange} />
        </Grid>
        <Grid item xs={12} md={6} lg={5}>
          <Typography sx={{ mb: 2, fontWeight: 'bold', ml: 1 }} color="primary">
            {t('shifts.days', 'Days of the week')}
          </Typography>
          <Box pl={1}>
            <DaysToggleList days={days} selected={daysSelected} onChange={handleDayChange} />
            <TextField
              sx={{ mt: 3 }}
              label="Start time"
              type="time"
              value={startTime}
              inputProps={{ label: 'Start time', min: MIN_HOURS.toString() }}
              onChange={(time) => setStartTime(time.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              error={!isValidStartTime()}
              helperText={!isValidStartTime() && t('shifts.errorStartTime', 'Start time must be greater than {{time}} or equal', { time: MIN_HOURS })}
              size="small"
            />
            <Typography sx={{ mb: 2, mt: 4, fontWeight: 'bold' }} color="primary">
              {t('shifts.duration', 'Duration')}
            </Typography>
            <Grid container columnSpacing={2}>
              <Grid item xs={6}>
                <TextField
                  sx={{ mb: { xs: 2, md: 0 } }}
                  type="number"
                  inputProps={{ min: '0', max: '23' }}
                  label={t('shifts.duration-hours', 'Hours')}
                  value={durationHours}
                  variant="outlined"
                  fullWidth
                  onChange={handleChangeDurationHours}
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="number"
                  inputProps={{ min: '0', max: '59' }}
                  label={t('shifts.duration-minutes', 'Minutes')}
                  value={durationMinutes}
                  variant="outlined"
                  fullWidth
                  onChange={handleChangeDurationMinutes}
                  size="small"
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Divider sx={{ width: '100%', my: 2 }} />

        <Box sx={styles.footerForm}>
          {onCloseDialog && (
            <Button autoFocus onClick={onCloseDialog} variant="outlined">
              {t('shifts.cancel', 'Cancel')}
            </Button>
          )}
          <LoadingButton
            variant="contained"
            onClick={handleNews}
            sx={{ ml: 2 }}
            loading={statusCreateShifts === 'loading'}
            disabled={!sitesSelected.length || !daysSelected.length || (durationHours === 0 && durationMinutes === 0) || !isValidStartTime()}
          >
            {t('shifts.create', 'Create')}
          </LoadingButton>
        </Box>
      </Grid>

      <ConfirmDialog
        open={Boolean(newItemsToAdd.length)}
        title={t('shifts.titleConfirm', '{{quantity}} new shifts will be created', { quantity: newItemsToAdd.length })}
        onAccept={handleCreate}
        onClose={() => setNewItemsToAdd([])}
      ></ConfirmDialog>
    </>
  );
};

const styles = {
  borderDivider: {
    mb: 2,
    '&::before, &::after': {
      borderColor: 'primary.main',
      borderWidth: '2px',
    },
  },
  footerForm: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
  },
};
