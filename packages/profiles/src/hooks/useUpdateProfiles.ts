import React from 'react';
import { useMutation, useQueryClient } from '@ppe/data-provider';
import { IDataSource } from '../data/IDataSource';
import { IProfile } from '../types/IProfile';
import { IProfiles } from '../types/IProfiles';
import { cacheKey } from '../utils/constants';

export const useUpdateProfiles = (dataSource: IDataSource) => {
  const { updateProfiles } = dataSource;
  const [error, setError] = React.useState<Error | null>(null);
  const queryClient = useQueryClient();

  const { mutate, status, reset } = useMutation(updateProfiles, {
    onMutate: async (items: IProfile[]) => {
      await queryClient.cancelQueries(cacheKey);

      const previous = queryClient.getQueryData<IProfiles>(cacheKey);

      if (previous) {
        const index = previous.profiles.findIndex((o) => o.id === items[0].id);
        const newProfiles = {
          profiles: [...previous.profiles],
        };
        newProfiles.profiles[index] = items[0];
        queryClient.setQueryData<IProfiles>(cacheKey, newProfiles);
      }

      return { previous };
    },
    onError: (error, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData<IProfiles>(cacheKey, context.previous);
      }
      setError(error as Error);
    },
  });

  return { update: mutate, status, error, reset };
};
