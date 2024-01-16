import { useMutation, useQueryClient } from '@ppe/data-provider';
import { IDataSource } from '../data/IDataSource';
import { ITeams } from '../types/ITeams';
import { cacheKey } from '../utils/constants';

export const useCreateTeams = (dataSource: IDataSource) => {
  const { createTeams } = dataSource;
  const queryClient = useQueryClient();

  const { mutate, status, error, reset } = useMutation(createTeams, {
    onSuccess: ({ data }) => {
      const previous = queryClient.getQueryData<ITeams>(cacheKey);
      if (previous) {
        const newTeams: ITeams = {
          teams: [...previous.teams, ...data.teams],
        };
        queryClient.setQueryData<ITeams>(cacheKey, newTeams);
      }
    },
  });

  return { create: mutate, status, error, reset };
};
