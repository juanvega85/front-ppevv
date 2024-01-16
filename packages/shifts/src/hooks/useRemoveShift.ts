import React from 'react';
import { useMutation, useQueryClient } from '@ppe/data-provider';
import { IDataSource } from '../data/IDataSource';
import { IShifts } from '../types/IShifts';
import { cacheKey } from '../utils/constants';

export const useRemoveShift = (dataSource: IDataSource) => {
  const { deleteShift } = dataSource;
  const queryClient = useQueryClient();
  const [error, setError] = React.useState<Error | null>(null);

  const { mutate, status, reset } = useMutation(deleteShift, {
    onMutate: async (id: string) => {
      await queryClient.cancelQueries(cacheKey);

      const previous = queryClient.getQueryData<IShifts>(cacheKey);

      if (previous) {
        const newShifts: IShifts = {
          ...previous,
          shifts: previous.shifts.filter((item) => item.id !== id),
        };
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
  });

  return { remove: mutate, status, error, reset };
};
