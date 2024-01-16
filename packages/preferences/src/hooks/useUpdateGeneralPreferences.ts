import { useMutation, useQueryClient } from '@ppe/data-provider';
import { IDataSource } from '../data/IDataSource';
import { cacheKey } from '../utils/constants';

export const useUpdateGeneralPreferences = (dataSource: IDataSource) => {
  const { updateGeneralPreferences } = dataSource;
  const queryClient = useQueryClient();

  const { mutate, status, reset, error } = useMutation(updateGeneralPreferences, {
    onMutate: async (params) => {
      await queryClient.cancelQueries(cacheKey);

      const previous = queryClient.getQueryData(cacheKey);

      if (previous) {
        queryClient.setQueryData(cacheKey, params.values);
      }

      return { previous };
    },
    onError: (_, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(cacheKey, context.previous);
      }
    },
  });

  return { update: mutate, status, reset, error };
};
