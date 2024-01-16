import React from 'react';
import { EventComponent } from './EventComponent';
import { EventsList } from './EventsList';
import { Box, Calendar, ICalendarEvent, Theme, useTheme, Modal } from '@ppe/ui';
import { format, isBefore, isSameDay, startOfMonth, endOfMonth } from 'date-fns';
import { EventParticipant } from './EventParticipant';
import { EventTitle } from './EventTitle';
import styles from './styles';
import { IDataSource } from '../data/IDataSource';
import { IPermissions } from '@ppe/authentication';
import { IShiftCalendarEvent } from '../types/IShiftCalendarEvent';
import { useCalendarEvents } from '../hooks/useCalendarEvents';
import { IShift } from '@ppe/shifts';
import { ISite } from '@ppe/sites';

interface Props {
  dataSource: IDataSource;
  permissions: IPermissions;
  userId: string;
}

export const CalendarParticipant = ({ dataSource, permissions, userId }: Props) => {
  const [currentEvent, setCurrentEvent] = React.useState<IShiftCalendarEvent | null>(null);
  const [dateFrom, setDateFrom] = React.useState<string | null>(format(startOfMonth(new Date()), 'yyyy-MM-dd'));
  const [dateTo, setDateTo] = React.useState<string | null>(format(endOfMonth(new Date()), 'yyyy-MM-dd'));
  const { events, loading } = useCalendarEvents(dataSource, dateFrom, dateTo, userId);
  const [selectedDay, setSelectedDay] = React.useState<Date | null>(null);
  const theme = useTheme();

  const toggleEvent = (event?: ICalendarEvent) => {
    if (currentEvent) {
      setCurrentEvent(null);
    } else {
      setCurrentEvent(event as IShiftCalendarEvent);
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
      <Box sx={styles}>
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
      <Box sx={{ display: { md: 'none' } }}>
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
          size="xs"
        >
          <EventParticipant event={currentEvent} onFinish={toggleEvent} dataSource={dataSource} permissions={permissions} />
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
