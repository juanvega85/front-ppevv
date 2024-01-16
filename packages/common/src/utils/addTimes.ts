import { isValidTime } from './isValidTime';

export const addTimes = (startTime: string, duration: string) => {
  const result: number[] = [0, 0, 0];

  if (!isValidTime(startTime) || !isValidTime(duration)) return 'ERROR';

  const startTimeArray = startTime.split(':').map((item) => parseInt(item));
  const durationArray = duration.split(':').map((item) => parseInt(item));

  result[0] = startTimeArray[0] + durationArray[0];
  result[1] = startTimeArray[1] + durationArray[1];
  result[2] = startTimeArray[2] + durationArray[2];

  if (result[2] >= 60) {
    const minutes = result[2] / 60;
    result[1] += minutes;
    result[2] -= 60 * minutes;
  }

  if (result[1] >= 60) {
    const hours = result[1] / 60;
    result[0] += hours;
    result[1] -= 60 * hours;
  }

  if (result[0] >= 24) result[0] -= 24;

  return `${`0${result[0]}`.slice(-2)}:${`0${result[1]}`.slice(-2)}:${`0${result[2]}`.slice(-2)}`;
};
