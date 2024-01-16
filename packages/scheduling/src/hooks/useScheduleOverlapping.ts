import { handleApiDataError } from '@ppe/common';
import React from 'react';
import { useQuery } from '@ppe/data-provider';
import { IDataSource } from '../data/IDataSource';
import { cacheKeySchedules } from '../utils/constants';

export const useScheduleOverlapping = (dataSource: IDataSource, shiftId: string, startDate: string, endDate: string) => {
  const { getScheduleOverlapping } = dataSource;

  const loadData = React.useCallback(async () => {
    if (!shiftId || !startDate || !endDate) {
      return { count: 0 };
    }
    const params = {
      startDate,
      endDate,
      countOnly: 'true',
    };

    const response = await getScheduleOverlapping(shiftId, params);
    if (typeof response.data.count === 'number') {
      return response.data;
    } else {
      handleApiDataError(new Error('Invalid response'));
    }
  }, [shiftId, startDate, endDate]);

  return useQuery([cacheKeySchedules, shiftId, startDate, endDate], loadData);
};
