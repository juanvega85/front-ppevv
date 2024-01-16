import React from 'react';
import { useMutation, useQueryClient } from '@ppe/data-provider';
import { IDataSource } from '../data/IDataSource';
import { ISite } from '../types/ISite';
import { ISites } from '../types/ISites';
import { cacheKey } from '../utils/constants';

export const useUpdateSites = (dataSource: IDataSource) => {
  const { updateSites } = dataSource;
  const queryClient = useQueryClient();
  const [error, setError] = React.useState<Error | null>(null);

  const { mutate, status, reset } = useMutation(updateSites, {
    onMutate: async (items: ISite[]) => {
      await queryClient.cancelQueries(cacheKey);

      const previous = queryClient.getQueryData<ISites>(cacheKey);

      if (previous) {
        const index = previous.sites.findIndex((o) => o.id === items[0].id);
        const newSites = {
          ...previous,
          sites: [...previous.sites],
        };
        newSites.sites[index] = items[0];
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

  return { update: mutate, status, error, reset };
};
