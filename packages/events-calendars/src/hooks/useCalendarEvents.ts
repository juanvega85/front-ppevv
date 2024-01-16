import React from 'react';
import { handleApiDataError } from '@ppe/common';
import { useQuery } from '@ppe/data-provider';
import { IDataSource } from '../data/IDataSource';
import { buildEvents } from './buildEvents';
import { timeSlotsSchema, shiftReportsSchema, cacheKeyTimeSlots, cacheKeyShiftReports } from '@ppe/scheduling';

export const useCalendarEvents = (dataSource: IDataSource, startDate: string | null, endDate: string | null, userId: string) => {
  const { getUserAssignments, getUserReports } = dataSource;

  const loadTimeSlots = async () => {
    if (!userId || !startDate || !endDate) return;

    const response = await getUserAssignments(userId, startDate, endDate);
    try {
      timeSlotsSchema.parse(response.data);
      return response.data;
    } catch (e) {
      handleApiDataError(e);
    }
  };

  const loadShiftReports = async () => {
    if (!userId || !startDate || !endDate) return;

    const response = await getUserReports(userId, startDate, endDate);
    try {
      shiftReportsSchema.parse(response.data);
      return response.data;
    } catch (e) {
      handleApiDataError(e);
    }
  };

  const { data: timeSlots, status: statusTimeslots, refetch: refetchTimeSlots } = useQuery([cacheKeyTimeSlots, startDate, endDate], loadTimeSlots);
  const {
    data: shiftReports,
    status: statusReports,
    refetch: refetchReports,
  } = useQuery([cacheKeyShiftReports, startDate, endDate], loadShiftReports);

  React.useEffect(() => {
    refetchTimeSlots();
    refetchReports();
  }, [userId]);

  const events = React.useMemo(() => buildEvents(timeSlots, shiftReports), [timeSlots, shiftReports]);

  return { events, loading: statusReports === 'loading' || statusTimeslots === 'loading' };
};
