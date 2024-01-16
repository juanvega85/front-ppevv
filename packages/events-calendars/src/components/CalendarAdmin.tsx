import React from 'react';
import { EventComponent } from './EventComponent';
import { EventsList } from './EventsList';
import { Box, Calendar, ICalendarEvent, Theme, useTheme, Fab, TextField, MenuItem, Modal } from '@ppe/ui';
import { format, isBefore, isSameDay, startOfMonth, endOfMonth } from 'date-fns';
import { Add as AddIcon } from '@ppe/icons';
import { useTranslation } from '@ppe/translation';
import { EventAdmin } from './EventAdmin';
import { EventTitle } from './EventTitle';
import { IDataSource } from '../data/IDataSource';
import { IPermissions } from '@ppe/authentication';
import { ISite, useSites } from '@ppe/sites';
import { IShiftCalendarEvent } from '../types/IShiftCalendarEvent';
import { useCalendarAdminEvents } from '../hooks/useCalendarAdminEvents';
import { ScheduleForm } from '@ppe/scheduling';
import styles from './styles';
import { IShift } from '@ppe/shifts';

interface Props {
  dataSource: IDataSource;
  permissions: IPermissions;
  userFullName?: string;
}

export const CalendarAdmin = ({ dataSource, permissions, userFullName = '' }: Props) => {
 
  const [selectedSite, setSelectedSite] = React.useState<ISite | undefined>(undefined);
  const [currentEvent, setCurrentEvent] = React.useState<IShiftCalendarEvent | null>(null);
  const [dateFrom, setDateFrom] = React.useState<string | null>(format(startOfMonth(new Date()), 'yyyy-MM-dd'));
  const [dateTo, setDateTo] = React.useState<string | null>(format(endOfMonth(new Date()), 'yyyy-MM-dd'));
  const { events, loading } = useCalendarAdminEvents(dataSource, selectedSite?.id, dateFrom, dateTo);
  const [selectedDay, setSelectedDay] = React.useState<Date | null>(null);
  const { canCreate } = permissions;
  const theme = useTheme();
  const { t } = useTranslation();

  const [open, setOpen] = React.useState(false);
  const toggle = () => setOpen(!open);

  const { data: sites, status: statusSites } = useSites(dataSource, { active: 'true' });

  const toggleEvent = (event?: ICalendarEvent) => {
    if (currentEvent) {
      setCurrentEvent(null);
    } else {
      const eventCalendar = event as IShiftCalendarEvent;
      if (selectedSite) {
        (eventCalendar.timeSlot.shift as IShift).site = selectedSite;
      }
      setCurrentEvent(eventCalendar);
    }
  };

  const handleRangeChange = (value: Date[] | { start: Date; end: Date }) => {
    if (Array.isArray(value)) {
      setDateFrom(value ? format(new Date(value[0]), 'yyyy-MM-dd') : null);
      setDateTo(value ? format(new Date(value[value.length - 1]), 'yyyy-MM-dd') : null);
    } else {
      setDateFrom(value ? format(new Date(value.start), 'yyyy-MM-dd') : null);
      setDateTo(value ? format(new Date(value.end), 'yyyy-MM-dd') : null);
    }
  };

  const eventsSelectedDay = selectedDay
    ? events.filter((item) => format(new Date(item.start), 'yyyy-MM-dd') === format(new Date(selectedDay), 'yyyy-MM-dd'))
    : [];

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <TextField
          label={t('calendar.sites', 'Sites')}
          value={selectedSite?.id || ''}
          onChange={(e) => setSelectedSite(sites?.find((item) => item.id === e.target.value))}
          select
          disabled={statusSites === 'loading'}
          sx={{ minWidth: '200px' }}
          size="small"
        >
          {(sites || []).map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>

        <Fab color="primary" onClick={toggle} disabled={!selectedSite || !canCreate} size="small">
          <AddIcon />
        </Fab>
      </Box>
      {selectedSite ? (
        <Modal open={open} onClose={toggle} title={selectedSite.name}>
          <ScheduleForm site={selectedSite} onFinish={toggle} dataSource={dataSource} userFullName={userFullName} />
        </Modal>
      ) : null}
      <Box sx={{ p: 2, ...styles }}>
        <Calendar
          events={events}
          onSelectEvent={toggleEvent}
          onSelectDay={setSelectedDay}
          onRangeChange={handleRangeChange}
          eventComponent={EventComponent}
          loading={loading}
          eventStyles={() => ({ style: getEventStyles(theme) })}
          tileStyles={getTileStyles}
        />
      </Box>
      <Box sx={{ display: { md: 'none' }, p: 2, pt: 0 }}>
        <EventsList day={selectedDay} events={eventsSelectedDay} onSelect={setCurrentEvent} />
      </Box>
      {currentEvent && (
        <Modal
          open={Boolean(currentEvent)}
          onClose={toggleEvent}
          title={
            <EventTitle
              siteName={((currentEvent.timeSlot.shift as IShift).site as ISite).name}
              date={currentEvent.start}
              time={currentEvent.timeSlot.timeOfDay}
            />
          }
          size={currentEvent.shiftReport ? 'sm' : 'md'}
        >
          <EventAdmin event={currentEvent} onFinish={toggleEvent} dataSource={dataSource} userFullName={userFullName} />
        </Modal>
      )}
    </>
  );
};

const getEventStyles = (theme: Theme) => {
  return {
    backgroundColor: theme.palette.primary.light,
    border: `1px solid ${theme.palette.primary.main}`,
    color: 'inherit',
    borderRadius: '0',
  };
};

const getTileStyles = (date: Date, eventsCalendar?: ICalendarEvent[]) => {
  const events = eventsCalendar as IShiftCalendarEvent[];

  const existsInEvents = (_date: Date) => events?.some((item: IShiftCalendarEvent) => isSameDay(new Date(item.start), new Date(_date)));
  const isPast = (_date: Date) => isBefore(new Date(_date), new Date());
  const eventsByDate = (_date: Date) => events.filter((item: IShiftCalendarEvent) => isSameDay(new Date(item.start), new Date(_date)));
  const hasUnreported = (array: IShiftCalendarEvent[]) => array.some((item: IShiftCalendarEvent) => !item.shiftReport);

  if (existsInEvents(date)) {
    if (!isPast(date)) return 'events-future';
    if (hasUnreported(eventsByDate(date))) return 'some-event-unreported';
    return 'all-events-reported';
  }
  return '';
};
