import React from 'react';
import { useQuery } from '@ppe/data-provider';
import { handleApiDataError } from '@ppe/common';
import { IDataSource } from '../data/IDataSource';
import { IProfiles, profilesSchema } from '../types/IProfiles';
import { cacheKey } from '../utils/constants';
import { getProfilesHydrated } from '../utils/getProfilesHydrated';

export const useProfiles = (dataSource: IDataSource) => {
  const { getProfiles } = dataSource;

  const loadData = React.useCallback(async () => {
    const response = await getProfiles();
    try {
      profilesSchema.parse(response.data);
      return response.data;
    } catch (e) {
      handleApiDataError(e);
    }
  }, []);

  const { data, status, error } = useQuery<IProfiles>(cacheKey, loadData);

  const profiles = React.useMemo(() => {
    return getProfilesHydrated(data);
  }, [data]);

  return { data: profiles, status, error };
};
