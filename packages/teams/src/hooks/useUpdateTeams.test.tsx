import { renderHook, waitFor } from '@testing-library/react';
import { useUpdateTeams } from './useUpdateTeams';
import { mockedDataSource } from '../data/sources/mocked';
import { getReactQueryWrapper } from '@ppe/common';

describe('useUpdateTeams', () => {
  it('should returns success on edit teams', async () => {
    const { result } = renderHook(() => useUpdateTeams(mockedDataSource), { wrapper: getReactQueryWrapper() });

    result.current.update([{ name: 'edit team', id: '1234' }]);

    await waitFor(() => expect(result.current.status).toBe('success'));
  });

  it('should returns error on edit teams', async () => {
    const updateTeams = () => Promise.reject(new Error());
    const { result } = renderHook(() => useUpdateTeams({ ...mockedDataSource, updateTeams }), { wrapper: getReactQueryWrapper() });

    result.current.update([{ name: 'edit team', id: '1234' }]);

    await waitFor(() => expect(result.current.status).toBe('error'));
  });
});
