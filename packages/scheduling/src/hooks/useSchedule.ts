import { handleApiDataError } from '@ppe/common';
import React from 'react';
import { useQuery } from '@ppe/data-provider';
import { IDataSource } from '../data/IDataSource';
import { schedulesSchema } from '../types/ISchedules';
import { cacheKeySchedules } from '../utils/constants';
import { getScheduleHydrated } from '../utils/getScheduleHydrated';

export const useSchedule = (dataSource: IDataSource, scheduleId: string, shiftId: string) => {
  const { getSchedule } = dataSource;

  const loadData = React.useCallback(async () => {
    const response = await getSchedule(scheduleId, shiftId);
    try {
      schedulesSchema.parse(response.data);
      return response.data;
    } catch (e) {
      handleApiDataError(e);
    }
  }, [scheduleId, shiftId]);

  const { data, status, error } = useQuery([cacheKeySchedules, scheduleId, shiftId], loadData);

  const schedule = React.useMemo(() => {
    if (!data) return undefined;

    return getScheduleHydrated(data);
  }, [data]);

  return { data: schedule, status, error };
};
