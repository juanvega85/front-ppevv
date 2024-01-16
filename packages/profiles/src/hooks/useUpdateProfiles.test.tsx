import { renderHook, waitFor } from '@testing-library/react';
import { mockedDataSource } from '../data/sources/mocked';
import { useUpdateProfiles } from './useUpdateProfiles';
import { profilesMock } from '../data/mocks/profiles.mock';
import { getReactQueryWrapper } from '@ppe/common';

describe('useUpdateProfiles', () => {
  it('should return status success on update profiles', async () => {
    const { result } = renderHook(() => useUpdateProfiles(mockedDataSource), { wrapper: getReactQueryWrapper() });

    result.current.update([profilesMock.data.profiles[0]]);

    await waitFor(() => expect(result.current.status).toBe('success'));
  });

  it('should return status error on update profiles', async () => {
    const updateProfiles = () => Promise.reject(new Error('api error'));
    const { result } = renderHook(() => useUpdateProfiles({ ...mockedDataSource, updateProfiles }), { wrapper: getReactQueryWrapper() });

    result.current.update([profilesMock.data.profiles[0]]);

    await waitFor(() => expect(result.current.status).toBe('error'));
  });
});
