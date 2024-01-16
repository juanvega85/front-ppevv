import { renderHook, waitFor } from '@testing-library/react';
import { useRemoveSite } from './useRemoveSite';
import { mockedDataSource } from '../data/sources/mocked';
import { getReactQueryWrapper } from '@ppe/common';

describe('useRemoveSite', () => {
  it('should returns success on remove site', async () => {
    const { result } = renderHook(() => useRemoveSite(mockedDataSource), { wrapper: getReactQueryWrapper() });

    result.current.remove('1234');

    await waitFor(() => expect(result.current.status).toBe('success'));
  });

  it('should returns error on remove site', async () => {
    const deleteSite = () => Promise.reject(new Error());
    const { result } = renderHook(() => useRemoveSite({ ...mockedDataSource, deleteSite }), { wrapper: getReactQueryWrapper() });

    result.current.remove('1234');

    await waitFor(() => expect(result.current.status).toBe('error'));
  });
});
