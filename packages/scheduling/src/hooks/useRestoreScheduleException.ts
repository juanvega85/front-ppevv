import { useMutation, useQueryClient } from '@ppe/data-provider';
import { IDataSource } from '../data/IDataSource';
import { cacheKeyShiftReports, cacheKeyTimeSlots } from '../utils/constants';

export const useRestoreScheduleException = (dataSource: IDataSource) => {
  const { restoreScheduleException } = dataSource;
  const queryClient = useQueryClient();

  const { mutate, status, reset } = useMutation(restoreScheduleException, {
    onSuccess: () => {
      queryClient.invalidateQueries([cacheKeyTimeSlots]);
      queryClient.invalidateQueries([cacheKeyShiftReports]);
    },
  });

  return { restore: mutate, status, reset };
};
