import { handleApiDataError } from '@ppe/common';
import React from 'react';
import { useQuery } from '@ppe/data-provider';
import { IDataSource } from '../data/IDataSource';
import { IShift } from '../types/IShift';
import { IShifts, shiftsSchema } from '../types/IShifts';
import { cacheKey } from '../utils/constants';
import { getShiftsHydrated } from '../utils/getShiftsHydrated';

export const useShifts = (dataSource: IDataSource, params?: Record<string, string>) => {
  const { getShifts } = dataSource;

  const loadData = React.useCallback(async () => {
    const response = await getShifts(params);
    try {
      shiftsSchema.parse(response.data);
      return response.data;
    } catch (e) {
      handleApiDataError(e);
    }
  }, [params]);

  const cacheId = params ? [cacheKey, params] : cacheKey;

  const { data, status, error } = useQuery<IShifts>(cacheId, loadData);

  const shifts: IShift[] = React.useMemo(() => {
    return getShiftsHydrated(data);
  }, [data]);

  return { data: shifts, status, error };
};
