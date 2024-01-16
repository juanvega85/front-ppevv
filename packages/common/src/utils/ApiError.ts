/* eslint-disable no-console */

export const handleApiDataError = (e: unknown) => {
  console.log(e);
  throw new Error('Api data error');
};
