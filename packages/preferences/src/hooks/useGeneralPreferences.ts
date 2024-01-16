import { handleApiDataError } from '@ppe/common';
import React from 'react';
import { useQuery } from '@ppe/data-provider';
import { IDataSource } from '../data/IDataSource';
import { generalPreferencesShema } from '../types/IGeneralPreference';
import { cacheKey } from '../utils/constants';

export const useGeneralPreferences = (dataSource: IDataSource, userId: string) => {
  const { getGeneralPreferences } = dataSource;

  const loadData = async () => {
    const response = await getGeneralPreferences(userId);
    try {
      generalPreferencesShema.parse(response.data);
      return response.data;
    } catch (e) {
      handleApiDataError(e);
    }
  };

  const { data, status, error, refetch } = useQuery(cacheKey, loadData, { retry: false });

  React.useEffect(() => {
    refetch();
  }, [userId]);

  return { data, status, error };
};
