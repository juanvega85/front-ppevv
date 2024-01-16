import { renderHook, waitFor } from '@testing-library/react';
import { useRemoveShift } from './useRemoveShift';
import { mockedDataSource } from '../data/sources/mocked';
import { getReactQueryWrapper } from '@ppe/common';

describe('useRemoveShift', () => {
  it('should returns success on remove shift', async () => {
    const { result } = renderHook(() => useRemoveShift(mockedDataSource), { wrapper: getReactQueryWrapper() });

    result.current.remove('1234');

    await waitFor(() => expect(result.current.status).toBe('success'));
  });

  it('should returns error on remove shift', async () => {
    const deleteShift = () => Promise.reject(new Error());
    const { result } = renderHook(() => useRemoveShift({ ...mockedDataSource, deleteShift }), { wrapper: getReactQueryWrapper() });

    result.current.remove('1234');

    await waitFor(() => expect(result.current.status).toBe('error'));
  });
});
