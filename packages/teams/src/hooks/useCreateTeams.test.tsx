import { renderHook, waitFor } from '@testing-library/react';
import { useCreateTeams } from './useCreateTeams';
import { mockedDataSource } from '../data/sources/mocked';
import { getReactQueryWrapper } from '@ppe/common';

describe('useCreateTeams', () => {
  it('should returns success on create teams', async () => {
    const { result } = renderHook(() => useCreateTeams(mockedDataSource), { wrapper: getReactQueryWrapper() });

    result.current.create([{ name: 'new team' }]);

    await waitFor(() => expect(result.current.status).toBe('success'));
  });

  it('should return error on create teams', async () => {
    const createTeams = () => Promise.reject(new Error());
    const { result } = renderHook(() => useCreateTeams({ ...mockedDataSource, createTeams }), { wrapper: getReactQueryWrapper() });

    result.current.create([{ name: 'new team' }]);

    await waitFor(() => expect(result.current.status).toBe('error'));
  });
});
