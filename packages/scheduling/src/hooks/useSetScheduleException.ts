import { useMutation, useQueryClient } from '@ppe/data-provider';
import { IDataSource } from '../data/IDataSource';
import { cacheKeyShiftReports, cacheKeyTimeSlots } from '../utils/constants';

export const useSetScheduleException = (dataSource: IDataSource) => {
  const { setScheduleException } = dataSource;
  const queryClient = useQueryClient();

  const { mutate, status, reset } = useMutation(setScheduleException, {
    onSuccess: () => {
      queryClient.invalidateQueries([cacheKeyTimeSlots]);
      queryClient.invalidateQueries([cacheKeyShiftReports]);
    },
  });

  return { update: mutate, status, reset };
};
