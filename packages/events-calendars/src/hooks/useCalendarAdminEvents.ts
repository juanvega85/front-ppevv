import React from 'react';
import { useQuery } from '@ppe/data-provider';
import { handleApiDataError } from '@ppe/common';
import { IDataSource } from '../data/IDataSource';
import { buildEvents } from './buildEvents';
import { timeSlotsSchema, shiftReportsSchema, cacheKeyTimeSlots, cacheKeyShiftReports } from '@ppe/scheduling';

export const useCalendarAdminEvents = (dataSource: IDataSource, siteId: string | undefined, startDate: string | null, endDate: string | null) => {
  const { getAssignments, getReports } = dataSource;

  const loadTimeSlots = async () => {
    if (!siteId || !startDate || !endDate) return;

    const response = await getAssignments(siteId, startDate, endDate);
    try {
      timeSlotsSchema.parse(response.data);
      return response.data;
    } catch (e) {
      handleApiDataError(e);
    }
  };

  const loadShiftReports = async () => {
    if (!siteId || !startDate || !endDate) return;

    const response = await getReports(siteId, startDate, endDate);

    try {
      shiftReportsSchema.parse(response.data);
      return response.data;
    } catch (e) {
      handleApiDataError(e);
    }
  };

  const {
    data: timeSlots,
    status: statusTimeslots,
    refetch: refetchTimeSlots,
  } = useQuery([cacheKeyTimeSlots, siteId, startDate, endDate], loadTimeSlots);
  const {
    data: shiftReports,
    status: statusReports,
    refetch: refetchReports,
  } = useQuery([cacheKeyShiftReports, siteId, startDate, endDate], loadShiftReports);

  React.useEffect(() => {
    refetchTimeSlots();
    refetchReports();
  }, [siteId]);

  const events = React.useMemo(() => buildEvents(timeSlots, shiftReports), [timeSlots, shiftReports]);

  return { events, loading: statusReports === 'loading' || statusTimeslots === 'loading' };
};
