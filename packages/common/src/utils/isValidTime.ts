export const isValidTime = (time: string) => {
  const timeRegex = /^([0-1]?\d|2[0-3])(?::([0-5]?\d))?(?::([0-5]?\d))?$/;
  return timeRegex.test(time);
};
