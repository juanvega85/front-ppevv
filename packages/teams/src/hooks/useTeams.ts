import React from 'react';
import { useQuery } from '@ppe/data-provider';
import { handleApiDataError } from '@ppe/common';
import { IDataSource } from '../data/IDataSource';
import { cacheKey } from '../utils/constants';
import { ITeams, teamsSchema } from '../types/ITeams';

export const useTeams = (dataSource: IDataSource) => {
  const { getTeams } = dataSource;

  const loadData = React.useCallback(async () => {
    const response = await getTeams();
    try {
      teamsSchema.parse(response.data);
      return response.data;
    } catch (e) {
      handleApiDataError(e);
    }
  }, []);

  const { data, status, error } = useQuery<ITeams>(cacheKey, loadData);

  const teams = React.useMemo(() => {
    if (!data) return [];
    return data.teams.sort((a, b) => a.name.localeCompare(b.name));
  }, [data, status]);

  return { data: teams, status, error };
};
