import React from 'react';
import { useMutation, useQueryClient } from '@ppe/data-provider';
import { IDataSource } from '../data/IDataSource';
import { ITeam } from '../types/ITeam';
import { ITeams } from '../types/ITeams';
import { cacheKey } from '../utils/constants';

export const useUpdateTeams = (dataSource: IDataSource) => {
  const { updateTeams } = dataSource;
  const queryClient = useQueryClient();
  const [error, setError] = React.useState<Error | null>(null);

  const { mutate, status, reset } = useMutation(updateTeams, {
    onMutate: async (items: ITeam[]) => {
      await queryClient.cancelQueries(cacheKey);

      const previous = queryClient.getQueryData<ITeams>(cacheKey);

      if (previous) {
        const index = previous.teams.findIndex((o) => o.id === items[0].id);
        const newTeams = {
          ...previous,
          teams: [...previous.teams],
        };
        newTeams.teams[index] = items[0];
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

  return { update: mutate, status, error, reset };
};
