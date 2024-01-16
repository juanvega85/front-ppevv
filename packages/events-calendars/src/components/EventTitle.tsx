import { AccessTime as ClockIcon } from '@ppe/icons';
import { removeSeconds, useWeekDayName } from '@ppe/common';
import { Typography } from '@ppe/ui';
import { format } from 'date-fns';
import { useTranslation } from '@ppe/translation';
import en from 'date-fns/locale/en-US';
import es from 'date-fns/locale/es';

interface Props {
  siteName?: string;
  date?: Date | string;
  time?: string;
}

export const EventTitle = ({ siteName = '', date = '', time = '' }: Props) => {
  const { i18n } = useTranslation();
  const { language } = i18n;

  const weekDayName = useWeekDayName(date);

  return (
    <Typography component="div">
      <div>{siteName}</div>
      <div style={{ display: 'flex' }}>
        <ClockIcon sx={{ pr: 1 }} />
        {`${removeSeconds(time)} `}
        {`${weekDayName} ${format(new Date(date), 'd MMM yyyy', { locale: language === 'es' ? es : en })}`}
      </div>
    </Typography>
  );
};
