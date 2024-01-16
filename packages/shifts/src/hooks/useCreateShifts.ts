import { useMutation, useQueryClient } from '@ppe/data-provider';
import { IDataSource } from '../data/IDataSource';
import { IShifts } from '../types/IShifts';
import { cacheKey } from '../utils/constants';

export const useCreateShifts = (dataSource: IDataSource) => {
  const { createShifts } = dataSource;
  const queryClient = useQueryClient();

  const { mutate, status } = useMutation(createShifts, {
    onSuccess: ({ data }) => {
      const previous = queryClient.getQueryData<IShifts>(cacheKey);
      if (previous) {
        const newShifts: IShifts = {
          shifts: [...previous.shifts, ...data.shifts],
        };
        queryClient.setQueryData<IShifts>(cacheKey, newShifts);
      }
    },
  });

  return { create: mutate, status };
};
