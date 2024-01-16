import { renderHook, waitFor } from '@testing-library/react';
import { useRemoveTeam } from './useRemoveTeam';
import { mockedDataSource } from '../data/sources/mocked';
import { getReactQueryWrapper } from '@ppe/common';

describe('useRemoveTeam', () => {
  it('should returns success on remove team', async () => {
    const { result } = renderHook(() => useRemoveTeam(mockedDataSource), { wrapper: getReactQueryWrapper() });

    result.current.remove('1234');

    await waitFor(() => expect(result.current.status).toBe('success'));
  });

  it('should returns error on remove team', async () => {
    const deleteTeam = () => Promise.reject(new Error());
    const { result } = renderHook(() => useRemoveTeam({ ...mockedDataSource, deleteTeam }), { wrapper: getReactQueryWrapper() });

    result.current.remove('1234');

    await waitFor(() => expect(result.current.status).toBe('error'));
  });
});
