import { renderHook, waitFor } from '@testing-library/react';
import { getReactQueryWrapper } from '@ppe/common';
import { mockedDataSource } from '../data/sources/mocked';
import { useRestoreScheduleException } from './useRestoreScheduleException';

const data = {
  shiftId: '62ae34d43e83340a92863709',
  timeSlotId: '6345a7599242c30fa1782c6f08DAA53AFD239400',
};

describe('useRestoreScheduleException', () => {
  it('should return status success on restore schedule exception', async () => {
    const { result } = renderHook(() => useRestoreScheduleException(mockedDataSource), { wrapper: getReactQueryWrapper() });

    result.current.restore(data);

    await waitFor(() => expect(result.current.status).toBe('success'));
  });

  it('should return status error on restore schedule exception', async () => {
    const restoreScheduleException = () => Promise.reject(new Error('Api error'));
    const { result } = renderHook(() => useRestoreScheduleException({ ...mockedDataSource, restoreScheduleException }), {
      wrapper: getReactQueryWrapper(),
    });

    result.current.restore(data);

    await waitFor(() => expect(result.current.status).toBe('error'));
  });
});
