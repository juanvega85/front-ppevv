import { renderHook, waitFor } from '@testing-library/react';
import { mockedDataSource } from '../data/sources/mocked';
import { useProfiles } from './useProfiles';
import { getReactQueryWrapper } from '@ppe/common';
import { profilesMock } from '../data/mocks/profiles.mock';
import { getProfilesHydrated } from '../utils/getProfilesHydrated';

describe('useProfiles', () => {
  it('should return profiles', async () => {
    const { result } = renderHook(() => useProfiles(mockedDataSource), { wrapper: getReactQueryWrapper() });

    await waitFor(() => expect(result.current.status).toBe('success'));

    const profiles = getProfilesHydrated(profilesMock.data);

    expect(result.current.data).toEqual(profiles);
  });

  it('should return error on get profiles', async () => {
    const getProfiles = () => Promise.reject(new Error('Api Error'));
    const { result } = renderHook(() => useProfiles({ ...mockedDataSource, getProfiles }), { wrapper: getReactQueryWrapper() });

    await waitFor(() => expect(result.current.status).toBe('error'));

    expect(result.current.data).toEqual([]);
  });
});
