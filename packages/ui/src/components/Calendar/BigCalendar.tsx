import React from 'react';
import { Box, Typography } from '@mui/material';
import { Calendar, dateFnsLocalizer, EventProps, momentLocalizer } from 'react-big-calendar';
import { ICalendarEvent } from '../../types/ICalendarEvent';
import moment from 'moment'
import 'moment/locale/es'; 
interface Props {
  events?: ICalendarEvent[];
  onSelectEvent?: (event: ICalendarEvent) => void;
  onRangeChange?: (range: Date[] | { start: Date; end: Date }) => void;
  eventComponent?: React.ComponentType<EventProps<ICalendarEvent>>;
  eventStyles?: (
    event: ICalendarEvent,
    start: Date,
    end: Date,
    isSelected: boolean
  ) => {
    className?: string | undefined;
    style?: React.CSSProperties;
  };
}

const BigCalendar = ({ events, onSelectEvent, onRangeChange, eventStyles, eventComponent }: Props) => {
  const localizer = momentLocalizer(moment);

  return (
    <Box sx={styles}>
      <Typography component="div">
        <Calendar
          messages={{ previous: '<<', next: '>>', today: 'Hoy', month: 'Mes', week: 'Semana', day: 'Día' }}
          localizer={localizer}
          events={events}
          startAccessor={(event: ICalendarEvent) => event.start}
          endAccessor={(event: ICalendarEvent) => event.end}
          titleAccessor={(event: ICalendarEvent) => event.title}
          onSelectEvent={(event) => onSelectEvent?.(event)}
          eventPropGetter={eventStyles}
          onRangeChange={(range) => onRangeChange?.(range)}
          style={{ height: 900 }}
          views={['month', 'week', 'day']}
          min={new Date(2020, 1, 1, 0, 0, 0, 0)}
          culture='es'
          showMultiDayTimes
          components={{ event: eventComponent }}
        />
      </Typography>
    </Box>
  );
};

export default BigCalendar;

const styles = {
  '.rbc-calendar': {
    '.rbc-today': {
      backgroundColor: 'rgb(255, 254, 218)',
    },
    '.rbc-active, button.rbc-active:focus': {
      backgroundColor: 'primary.main',
      color: 'common.white',
      fontWeight: 'bold',
    },
    '.rbc-toolbar-label': {
      textTransform: 'capitalize',
      fontWeight: 'bold',
      fontSize: '20px',
    },
  },
};
