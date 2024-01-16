import { renderHook, waitFor } from '@testing-library/react';
import { getReactQueryWrapper } from '@ppe/common';
import { mockedDataSource } from '../data/sources/mocked';
import { useUpdateSchedule } from './useUpdateSchedule';

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

describe('useUpdateSchedule', () => {
  it('should return status success on update schedule', async () => {
    const { result } = renderHook(() => useUpdateSchedule(mockedDataSource), { wrapper: getReactQueryWrapper() });

    result.current.update(data);

    await waitFor(() => expect(result.current.status).toBe('success'));
  });

  it('should return status error on update schedule', async () => {
    const updateSchedule = () => Promise.reject(new Error('Api error'));
    const { result } = renderHook(() => useUpdateSchedule({ ...mockedDataSource, updateSchedule }), { wrapper: getReactQueryWrapper() });

    result.current.update(data);

    await waitFor(() => expect(result.current.status).toBe('error'));
  });
});
