import { PeopleAlt as PeopleIcon, Check as CheckIcon, WarningAmber as WarningIcon, AltRoute as ChangedIcon } from '@ppe/icons';
import { ICalendarEvent, Typography } from '@ppe/ui';
import { IShiftCalendarEvent } from '../types/IShiftCalendarEvent';

interface Props {
  event: ICalendarEvent;
}
export const EventComponent = ({ event }: Props) => {
  const eventCalendar = event as IShiftCalendarEvent;
  return (
    <Typography sx={{ ...styles.container, width: '100%' }} component="div" variant="body2">
      <div>{eventCalendar.title}</div>
      <div style={styles.container}>
        {eventCalendar.timeSlot.isException && <ChangedIcon fontSize="small" />}

        {eventCalendar.attendance ? (
          <div style={styles.container}>
            {eventCalendar.attendance}
            <PeopleIcon fontSize="small" color={eventCalendar.attendanceWarning ? 'warning' : 'success'} sx={{ mx: 1 }} />
          </div>
        ) : null}
        {eventCalendar.prevToday ? (
          <>{eventCalendar.shiftReport ? <CheckIcon color="success" fontSize="small" /> : <WarningIcon color="warning" fontSize="small" />}</>
        ) : null}
      </div>
    </Typography>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};
