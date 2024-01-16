import { renderHook, waitFor } from '@testing-library/react';
import { getReactQueryWrapper } from '@ppe/common';
import { mockedDataSource } from '../data/sources/mocked';
import { useCreateSchedule } from './useCreateSchedule';

const data = {
  shiftId: '62ae34d43e83340a92863709',
  data: [
    {
      assigned: [{ id: '62abdd8e89d5bc0ffc129116' }],
      notes: [],
      periodEndDay: '2022-10-31',
      periodStartDay: '2022-10-01',
    },
  ],
};

describe('useCreateSchedule', () => {
  it('should return status success on create schedule', async () => {
    const { result } = renderHook(() => useCreateSchedule(mockedDataSource), { wrapper: getReactQueryWrapper() });

    result.current.create(data);

    await waitFor(() => expect(result.current.status).toBe('success'));
  });

  it('should return status error on create schedule', async () => {
    const createSchedule = () => Promise.reject(new Error('Api error'));
    const { result } = renderHook(() => useCreateSchedule({ ...mockedDataSource, createSchedule }), { wrapper: getReactQueryWrapper() });

    result.current.create(data);

    await waitFor(() => expect(result.current.status).toBe('error'));
  });
});
