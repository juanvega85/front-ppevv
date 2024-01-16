import { useMutation, useQueryClient } from '@ppe/data-provider';
import { IDataSource } from '../data/IDataSource';
import { cacheKeyShiftReports, cacheKeyTimeSlots } from '../utils/constants';

export const useUpdateSchedule = (dataSource: IDataSource) => {
  const { updateSchedule } = dataSource;
  const queryClient = useQueryClient();

  const { mutate, status, reset } = useMutation(updateSchedule, {
    onSuccess: () => {
      queryClient.invalidateQueries([cacheKeyTimeSlots]);
      queryClient.invalidateQueries([cacheKeyShiftReports]);
    },
  });

  return { update: mutate, status, reset };
};
