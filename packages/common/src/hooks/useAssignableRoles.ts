import { useQuery } from '@ppe/data-provider';
import { IDataSource } from '../data/IDataSource';

const cacheKey = 'assignableRoles';

export const useAssignableRoles = (dataSource: IDataSource) => {
  const { getAssignableRoles } = dataSource;

  const loadData = async () => {
    const response = await getAssignableRoles();
    return response.data;
  };

  return useQuery<string[]>(cacheKey, loadData);
};
