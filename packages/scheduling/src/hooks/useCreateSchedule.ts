import { useMutation, useQueryClient } from '@ppe/data-provider';
import { IDataSource } from '../data/IDataSource';
import { cacheKeyShiftReports, cacheKeyTimeSlots } from '../utils/constants';

export const useCreateSchedule = (dataSource: IDataSource) => {
  const { createSchedule } = dataSource;
  const queryClient = useQueryClient();

  const { mutate, status, reset } = useMutation(createSchedule, {
    onSuccess: () => {
      queryClient.invalidateQueries([cacheKeyTimeSlots]);
      queryClient.invalidateQueries([cacheKeyShiftReports]);
    },
  });

  return { create: mutate, status, reset };
};
