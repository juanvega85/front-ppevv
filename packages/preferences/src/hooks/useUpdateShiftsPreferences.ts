import { useMutation } from '@ppe/data-provider';
import { IDataSource } from '../data/IDataSource';

export const useUpdateShiftsPreferences = (dataSource: IDataSource) => {
  const { updateShiftsPreferences } = dataSource;
  const { mutate, status, reset } = useMutation(updateShiftsPreferences);

  return { update: mutate, status, reset };
};
