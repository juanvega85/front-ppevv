import { renderHook, waitFor } from '@testing-library/react';
import { useTeams } from './useTeams';
import { mockedDataSource } from '../data/sources/mocked';
import { teamsMock } from '../data/mocks/teams.mock';
import { getReactQueryWrapper } from '@ppe/common';

describe('useTeams', () => {
  it('should return teams', async () => {
    const { result } = renderHook(() => useTeams(mockedDataSource), { wrapper: getReactQueryWrapper() });

    await waitFor(() => expect(result.current.status).toBe('success'));

    expect(result.current.data).toEqual(teamsMock.data.teams);
  });

  it('should return error', async () => {
    const getTeams = () => Promise.reject(new Error('Api error'));
    const { result } = renderHook(() => useTeams({ ...mockedDataSource, getTeams }), { wrapper: getReactQueryWrapper() });

    await waitFor(() => expect(result.current.status).toBe('error'));
    expect(result.current.data).toEqual([]);
  });
});
