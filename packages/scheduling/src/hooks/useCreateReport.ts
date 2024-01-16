import { useMutation, useQueryClient } from '@ppe/data-provider';
import { IDataSource } from '../data/IDataSource';
import { cacheKeyShiftReports, cacheKeyTimeSlots } from '../utils/constants';

export const useCreateReport = (dataSource: IDataSource) => {
  const { createReport } = dataSource;
  const queryClient = useQueryClient();

  const { mutate, status, reset } = useMutation(createReport, {
    onSuccess: () => {
      queryClient.invalidateQueries([cacheKeyTimeSlots]);
      queryClient.invalidateQueries([cacheKeyShiftReports]);
    },
  });

  return { create: mutate, status, reset };
};
