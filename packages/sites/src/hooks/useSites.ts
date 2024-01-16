import React from 'react';
import { useQuery } from '@ppe/data-provider';
import { handleApiDataError } from '@ppe/common';
import { IDataSource } from '../data/IDataSource';
import { cacheKey } from '../utils/constants';
import { ISites, sitesSchema } from '../types/ISites';
import { getSitesHydrated } from '../utils/getSitesHydrated';

export const useSites = (dataSource: IDataSource, params?: Record<string, string>) => {
  const { getSites } = dataSource;

  const loadData = React.useCallback(async () => {
    const response = await getSites(params);
    try {
      sitesSchema.parse(response.data);
      return response.data;
    } catch (e) {
      handleApiDataError(e);
    }
  }, [params]);

  const cacheId = params ? [cacheKey, params] : cacheKey;

  const { data, status, error } = useQuery<ISites>(cacheId, loadData);

  const sites = React.useMemo(() => {
    return getSitesHydrated(data).sort((a, b) => a.name.localeCompare(b.name));
  }, [data]);

  return { data: sites, status, error };
};
