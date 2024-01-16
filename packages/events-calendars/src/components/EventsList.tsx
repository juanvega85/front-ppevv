import { Box, ButtonBase, colors } from '@ppe/ui';
import { format } from 'date-fns';
import { IShiftCalendarEvent } from '../types/IShiftCalendarEvent';
import { EventComponent } from './EventComponent';
import { useWeekDayName } from '@ppe/common';
import { useTranslation } from '@ppe/translation';
import en from 'date-fns/locale/en-US';
import es from 'date-fns/locale/es';

const { grey } = colors;

interface Props {
  day: Date | null;
  events: IShiftCalendarEvent[];
  onSelect?: (event: IShiftCalendarEvent) => void;
}

export const EventsList = ({ day, events, onSelect }: Props) => {
  const { i18n } = useTranslation();
  const { language } = i18n;
  const weekDayName = useWeekDayName(day);

  return (
    <>
      <Box mt={3} mb={2}>
        {day && events.length ? `${weekDayName} ${format(new Date(day), 'd MMM yyyy', { locale: language === 'es' ? es : en })}` : ''}
      </Box>
      {events.map((item) => (
        <ButtonBase key={item.id} onClick={() => onSelect?.(item)} sx={styles.button}>
          <EventComponent event={item} />
        </ButtonBase>
      ))}
    </>
  );
};

const styles = {
  button: {
    width: '100%',
    cursor: 'pointer',
    p: 1,

    backgroundColor: grey[100],
    border: `1px solid ${grey[300]}`,
    boxShadow: 2,
    borderRadius: '3px',

    '&:hover': {
      border: `1px solid ${grey[400]}`,
      boxShadow: 1,
    },
  },
};
