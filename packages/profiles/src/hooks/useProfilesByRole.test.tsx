import { renderHook, waitFor } from '@testing-library/react';
import { mockedDataSource } from '../data/sources/mocked';
import { useProfilesByRole } from './useProfilesByRole';
import { getReactQueryWrapper } from '@ppe/common';
import { profilesMock } from '../data/mocks/profiles.mock';
import { getProfilesHydrated } from '../utils/getProfilesHydrated';

describe('useProfilesByRole', () => {
  it('should return profiles', async () => {
    const { result } = renderHook(() => useProfilesByRole(mockedDataSource, 'managerRoleId'), { wrapper: getReactQueryWrapper() });

    await waitFor(() => expect(result.current.status).toBe('success'));

    const profiles = getProfilesHydrated(profilesMock.data).sort((a, b) => a.firstName.localeCompare(b.firstName));

    expect(result.current.data).toEqual(profiles);
  });

  it('should return error on profiles', async () => {
    const getProfilesByRole = () => Promise.reject(new Error('api error'));
    const { result } = renderHook(() => useProfilesByRole({ ...mockedDataSource, getProfilesByRole }, 'managerRoleId'), {
      wrapper: getReactQueryWrapper(),
    });

    await waitFor(() => expect(result.current.status).toBe('error'));

    expect(result.current.data).toEqual([]);
  });
});
