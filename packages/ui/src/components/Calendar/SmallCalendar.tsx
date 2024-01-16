import ReactCalendar, { CalendarTileProperties } from 'react-calendar';
import { startOfMonth, endOfMonth } from 'date-fns';
import { Box } from '@mui/material';
import { useTranslation } from '@ppe/translation';
import { ICalendarEvent } from '../../types/ICalendarEvent';

interface Props {
  events?: ICalendarEvent[];
  onMonthChange?: ({ start, end }: { start: Date; end: Date }) => void;
  onSelectDay?: (date: Date) => void;
  tileStyles?: (date: Date, events?: ICalendarEvent[]) => string;
}

const SmallCalendar = ({ events, onMonthChange, onSelectDay, tileStyles }: Props) => {
  const { i18n } = useTranslation();

  const handleActiveStartDateChange = ({ activeStartDate }: { activeStartDate: Date }) => {
    if (onMonthChange) {
      const start = startOfMonth(new Date(activeStartDate));
      const end = endOfMonth(new Date(activeStartDate));

      onMonthChange({ start, end });
    }
  };

  return (
    <Box sx={styles.container}>
      <ReactCalendar
        locale={i18n.language}
        className="small-calendar"
        minDetail="month"
        onClickDay={(date: Date) => onSelectDay?.(date)}
        tileClassName={({ date }: CalendarTileProperties) => tileStyles?.(date, events) || ''}
        onActiveStartDateChange={handleActiveStartDateChange}
      />
    </Box>
  );
};

export default SmallCalendar;

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '260px',

    '.small-calendar': {
      border: 'none',
      boxShadow: 'none !important',
      fontSize: '13px',
      padding: '0px !important',

      'abbr[title]': {
        textDecoration: 'none',
      },
    },

    '.react-calendar': {
      boxShadow: '0px 20px 31px 13px rgba(0, 0, 0, 0.2)',
      '&__navigation': {
        height: '30px',
        'button[disabled]': {
          backgroundColor: 'common.white',
          color: 'common.black',
        },
        '&__prev2-button, &__next2-button': {
          display: 'none',
        },
      },
      '&__tile': {
        height: '40px',
      },
    },
  },
};
