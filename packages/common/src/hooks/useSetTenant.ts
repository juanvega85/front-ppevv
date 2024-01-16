import { setTenantResponseSchema } from '@ppe/authentication';
import { useMutation } from '@ppe/data-provider';
import { showToast } from '@ppe/ui';
import { IDataSource } from '../data/IDataSource';
import { handleApiDataError } from '../utils/ApiError';

export const useSetTenant = (dataSource: IDataSource) => {
  const { setTenant } = dataSource;

  const { mutate, status, reset } = useMutation(setTenant, {
    onSuccess: (response) => {
      try {
        setTenantResponseSchema.parse(response.data);
      } catch (e) {
        handleApiDataError(e);
      }
    },
    onError: (error) => {
      showToast((error as Error).message, 'error');
    },
  });

  return { setTenant: mutate, status, reset };
};
