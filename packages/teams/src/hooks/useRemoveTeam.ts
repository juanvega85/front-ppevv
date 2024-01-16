import React from 'react';
import { useMutation, useQueryClient } from '@ppe/data-provider';
import { IDataSource } from '../data/IDataSource';
import { ITeams } from '../types/ITeams';
import { cacheKey } from '../utils/constants';

export const useRemoveTeam = (dataSource: IDataSource) => {
  const { deleteTeam } = dataSource;
  const queryClient = useQueryClient();
  const [error, setError] = React.useState<Error | null>(null);

  const { mutate, status, reset } = useMutation(deleteTeam, {
    onMutate: async (id: string) => {
      await queryClient.cancelQueries(cacheKey);

      const previous = queryClient.getQueryData<ITeams>(cacheKey);

      if (previous) {
        const newTeams: ITeams = {
          teams: previous.teams.filter((item) => item.id !== id),
        };
        queryClient.setQueryData<ITeams>(cacheKey, newTeams);
      }

      return { previous };
    },
    onError: (error, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData<ITeams>(cacheKey, context.previous);
      }
      setError(error as Error);
    },
  });

  return { remove: mutate, status, error, reset };
};
