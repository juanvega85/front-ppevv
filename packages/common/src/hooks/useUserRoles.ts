import { useQuery } from '@ppe/data-provider';
import { IDataSource } from '../data/IDataSource';
import { cacheKeyRoles } from '../utils/constants';

export const useUserRoles = (dataSource: IDataSource, userId: string) => {
  const { getUserRoles } = dataSource;

  const loadData = async () => {
    const response = await getUserRoles(userId);
    return response.data;
  };

  return useQuery<string[]>([cacheKeyRoles, userId], loadData);
};
