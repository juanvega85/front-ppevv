import { useMutation, useQueryClient } from '@ppe/data-provider';
import { IDataSource } from '../data/IDataSource';
import { cacheKeyRoles } from '../utils/constants';

export const useUpdateUserRoles = (dataSource: IDataSource) => {
  const { updateUserRoles } = dataSource;
  const queryClient = useQueryClient();

  const { mutate, status, error, reset } = useMutation(updateUserRoles, {
    onSuccess: () => {
      queryClient.invalidateQueries([cacheKeyRoles]);
    },
  });

  return { update: mutate, status, error, reset };
};
