import React from 'react';
import { useMutation, useQueryClient } from '@ppe/data-provider';
import { IDataSource } from '../data/IDataSource';
import { IProfiles } from '../types/IProfiles';
import { cacheKey } from '../utils/constants';

export const useRemoveProfile = (dataSource: IDataSource) => {
  const { deleteProfile } = dataSource;
  const [error, setError] = React.useState<Error | null>(null);
  const queryClient = useQueryClient();

  const { mutate, status, reset } = useMutation(deleteProfile, {
    onMutate: async (id: string) => {
      await queryClient.cancelQueries(cacheKey);

      const previous = queryClient.getQueryData<IProfiles>(cacheKey);

      if (previous) {
        const newProfiles = {
          profiles: previous.profiles.filter((item) => item.id !== id),
        };
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

  return { remove: mutate, status, error, reset };
};
