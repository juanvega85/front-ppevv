import { renderHook, waitFor } from '@testing-library/react';
import { getReactQueryWrapper } from '@ppe/common';
import { mockedDataSource } from '../data/sources/mocked';
import { useSetScheduleException } from './useSetScheduleException';

const data = {
  shiftId: '62ae34d43e83340a92863709',
  data: [
    {
      schedule: { id: '6345a7599242c30fa1782c6f' },
      shift: { id: '62ae34d43e83340a92863709' },
      isException: false,
      assigned: [{ id: '62b0a4e43e83340a9286372d' }],
      notes: [],
      active: true,
      duration: '02:30:00',
      timeOfDay: '12:30:00',
      date: '2022-10-03',
      id: '6345a7599242c30fa1782c6f08DAA53AFD239400',
    },
  ],
};

describe('useSetScheduleException', () => {
  it('should return status success on update schedule exception', async () => {
    const { result } = renderHook(() => useSetScheduleException(mockedDataSource), { wrapper: getReactQueryWrapper() });

    result.current.update(data);

    await waitFor(() => expect(result.current.status).toBe('success'));
  });

  it('should return status error on update schedule exception', async () => {
    const setScheduleException = () => Promise.reject(new Error('Api error'));
    const { result } = renderHook(() => useSetScheduleException({ ...mockedDataSource, setScheduleException }), { wrapper: getReactQueryWrapper() });

    result.current.update(data);

    await waitFor(() => expect(result.current.status).toBe('error'));
  });
});
