import { isValidTime } from './isValidTime';

export const removeSeconds = (time: string) => {
  if (!isValidTime(time)) return 'ERROR';

  const regex = /(?::([0-5]?\d))?$/;
  return time.replace(regex, '');
};
