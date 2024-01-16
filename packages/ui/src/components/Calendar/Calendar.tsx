import React from 'react';
import { Box } from '@mui/material';
import BigCalendar from './BigCalendar';
import SmallCalendar from './SmallCalendar';
import { ICalendarEvent } from '../../types/ICalendarEvent';
import { EventProps } from 'react-big-calendar';
import { Loader } from '../Loader/Loader';
import cssStyles from './styles';

export interface Props {
  events?: ICalendarEvent[];
  onSelectDay?: (value: Date) => void;
  onSelectEvent?: (event: ICalendarEvent) => void;
  onRangeChange?: (range: Date[] | { start: Date; end: Date }) => void;
  loading?: boolean;
  tileStyles?: (date: Date, events?: ICalendarEvent[]) => string;
  eventComponent?: React.ComponentType<EventProps<ICalendarEvent>>;
  eventStyles?: (
    event: ICalendarEvent,
    start: Date,
    end: Date,
    isSelected: boolean
  ) => {
    className?: string;
    style?: React.CSSProperties;
  };
  alwaysSmall?: boolean;
}

export const Calendar = ({
  events,
  onSelectDay,
  onSelectEvent,
  onRangeChange,
  loading,
  tileStyles,
  eventStyles,
  alwaysSmall,
  eventComponent,
}: Props) => {
  return (
    <Box style={{ position: 'relative' }} sx={cssStyles}>
      <Box sx={{ display: alwaysSmall ? 'flex' : { xs: 'flex', md: 'none' }, justifyContent: 'center' }}>
        <SmallCalendar events={events} onSelectDay={onSelectDay} onMonthChange={onRangeChange} tileStyles={tileStyles} />
      </Box>

      {!alwaysSmall ? (
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <BigCalendar
            events={events}
            onSelectEvent={onSelectEvent}
            onRangeChange={onRangeChange}
            eventComponent={eventComponent}
            eventStyles={eventStyles}
          />
        </Box>
      ) : null}

      {loading && (
        <div style={{ position: 'absolute', ...styles.loaderContainer }}>
          <Loader size="10px" />
        </div>
      )}
    </Box>
  );
};

const styles = {
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 100,
  },
};
