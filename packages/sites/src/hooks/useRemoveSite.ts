import React from 'react';
import { useMutation, useQueryClient } from '@ppe/data-provider';
import { IDataSource } from '../data/IDataSource';
import { ISites } from '../types/ISites';
import { cacheKey } from '../utils/constants';

export const useRemoveSite = (dataSource: IDataSource) => {
  const { deleteSite } = dataSource;
  const queryClient = useQueryClient();
  const [error, setError] = React.useState<Error | null>(null);

  const { mutate, status, reset } = useMutation(deleteSite, {
    onMutate: async (id: string) => {
      await queryClient.cancelQueries(cacheKey);

      const previous = queryClient.getQueryData<ISites>(cacheKey);

      if (previous) {
        const newSites = {
          ...previous,
          sites: previous.sites.filter((item) => item.id !== id),
        };
        queryClient.setQueryData<ISites>(cacheKey, newSites);
      }

      return { previous };
    },
    onError: (error, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData<ISites>(cacheKey, context.previous);
      }
      setError(error as Error);
    },
  });

  return { remove: mutate, status, error, reset };
};
