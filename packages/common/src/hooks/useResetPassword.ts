import { useMutation } from '@ppe/data-provider';
import { IDataSource } from '../data/IDataSource';

export const useResetPassword = (dataSource: IDataSource) => {
  const { resetPassword } = dataSource;

  const { mutate, status, reset, error } = useMutation(resetPassword);

  return { resetPassword: mutate, status, reset, error: error as Error };
};
