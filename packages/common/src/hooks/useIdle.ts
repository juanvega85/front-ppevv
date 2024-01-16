import React from 'react';
import createActivityDetector from 'activity-detector';

export const useIdle = (timeOutMinutes: number) => {
  const [isIdle, setIsIdle] = React.useState(false);

  if (timeOutMinutes <= 0) {
    throw new Error('timeOutMinutes must be a positive number');
  }

  const resetIdle = () => setIsIdle(false);

  React.useEffect(() => {
    const activityDetector = createActivityDetector({
      timeToIdle: timeOutMinutes * 60 * 1000,
      inactivityEvents: [''],
    });

    activityDetector.on('idle', () => setIsIdle(true));
    return () => activityDetector.stop();
  }, []);

  return { isIdle, resetIdle };
};
