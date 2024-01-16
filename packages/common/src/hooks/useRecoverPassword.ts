import { useMutation } from '@ppe/data-provider';
import { IDataSource } from '../data/IDataSource';

export const useRecoverPassword = (dataSource: IDataSource) => {
  const { recoverPassword } = dataSource;

  const { mutate, status, reset, error } = useMutation(recoverPassword);

  return { recoverPassword: mutate, status, reset, error: error as Error };
};
