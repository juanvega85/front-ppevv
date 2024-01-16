import React from 'react';
import { useMutation, useQueryClient } from '@ppe/data-provider';
import { IDataSource } from '../data/IDataSource';
import { IShift } from '../types/IShift';
import { IShifts } from '../types/IShifts';
import { cacheKey } from '../utils/constants';

export const useUpdateShifts = (dataSource: IDataSource) => {
  const { updateShifts } = dataSource;
  const queryClient = useQueryClient();
  const [error, setError] = React.useState<Error | null>(null);

  const { mutate, status, reset } = useMutation(updateShifts, {
    onMutate: async (item: IShift[]) => {
      await queryClient.cancelQueries(cacheKey);

      const previous = queryClient.getQueryData<IShifts>(cacheKey);

      if (previous) {
        const index = previous.shifts.findIndex((o) => o.id === item[0].id);
        const newShifts: IShifts = {
          ...previous,
          shifts: [...previous.shifts],
        };
        newShifts.shifts[index] = item[0];
        queryClient.setQueryData<IShifts>(cacheKey, newShifts);
      }

      return { previous };
    },
    onError: (error, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData<IShifts>(cacheKey, context.previous);
      }
      setError(error as Error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(cacheKey);
    },
  });

  return { update: mutate, status, error, reset };
};
