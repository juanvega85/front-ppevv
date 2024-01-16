import React from 'react';
import { useQuery } from '@ppe/data-provider';
import { IDataSource } from '../data/IDataSource';
import { IProfiles, profilesSchema } from '../types/IProfiles';
import { cacheKey } from '../utils/constants';
import { handleApiDataError } from '@ppe/common';
import { getProfilesHydrated } from '../utils/getProfilesHydrated';

export const useProfilesByRole = (dataSource: IDataSource, role: string) => {
  const { getProfilesByRole } = dataSource;

  const loadData = React.useCallback(async () => {
    const response = await getProfilesByRole(role);
    try {
      profilesSchema.parse(response.data);
      return response.data;
    } catch (e) {
      handleApiDataError(e);
    }
  }, []);

  const { data, status, error } = useQuery<IProfiles>([cacheKey, role], loadData);

  const profiles = React.useMemo(() => {
    if (!data) return [];
    return getProfilesHydrated(data).sort((a, b) => a.firstName.localeCompare(b.firstName));
  }, [data]);

  return { data: profiles, status, error };
};
