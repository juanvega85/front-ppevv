import { useWeekDays } from '../constants/useWeekDays';
import { getDay } from 'date-fns';

export const useWeekDayName = (date: string | Date | null) => {
  const weekDays = useWeekDays();

  if (!date) return '';

  if (typeof date === 'string') {
    const formatted = date.replaceAll('-', '/');
    let day = getDay(new Date(formatted)) - 1;
    if (day < 0) day = 6;

    return weekDays[day].name;
  }

  let day = getDay(new Date(date)) - 1;
  if (day < 0) day = 6;

  return weekDays[day].name;
};
