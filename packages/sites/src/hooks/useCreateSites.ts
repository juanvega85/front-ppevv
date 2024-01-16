import { useMutation, useQueryClient } from '@ppe/data-provider';
import { IDataSource } from '../data/IDataSource';
import { ISites } from '../types/ISites';
import { cacheKey } from '../utils/constants';

export const useCreateSites = (dataSource: IDataSource) => {
  const { createSites } = dataSource;
  const queryClient = useQueryClient();

  const { mutate, status, error, reset } = useMutation(createSites, {
    onSuccess: ({ data }) => {
      const previous = queryClient.getQueryData<ISites>(cacheKey);
      if (previous) {
        const newSites = {
          _profiles: { ...previous._profiles, ...data._profiles },
          _teams: { ...previous._teams, ...data._teams },
          sites: [...previous.sites, ...data.sites],
        };
        queryClient.setQueryData<ISites>(cacheKey, newSites);
      }
    },
  });

  return { create: mutate, status, error, reset };
};
