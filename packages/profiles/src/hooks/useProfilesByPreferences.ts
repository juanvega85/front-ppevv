import React from 'react';
import { useQuery } from '@ppe/data-provider';
import { IDataSource } from '../data/IDataSource';
import { IProfiles, profilesSchema } from '../types/IProfiles';
import { cacheKey } from '../utils/constants';
import { handleApiDataError } from '@ppe/common';
import { getProfilesHydrated } from '../utils/getProfilesHydrated';
import { IResponse } from '@ppe/networking';

export const useProfilesByPreferences = (dataSource: IDataSource, shiftId: string, type: 'all' | 'permanent' | 'temporary') => {
  const { getProfiles, getProfilesByPreferences } = dataSource;

  const loadData = React.useCallback(async () => {
    let response: IResponse<IProfiles>;
    if (type === 'all') {
      response = await getProfiles();
    } else {
      response = await getProfilesByPreferences(shiftId, type);
    }

    try {
      profilesSchema.parse(response.data);
      return response.data;
    } catch (e) {
      handleApiDataError(e);
    }
  }, [shiftId, type]);

  const { data, status, error, refetch } = useQuery<IProfiles>([cacheKey, shiftId, type], loadData, { enabled: false });

  const profiles = React.useMemo(() => {
    if (!data) return [];
    return getProfilesHydrated(data).sort((a, b) => a.firstName.localeCompare(b.firstName));
  }, [data]);

  return { data: profiles, status, error, refetch };
};
