import { renderHook, waitFor } from '@testing-library/react';
import { mockedDataSource } from '../data/sources/mocked';
import { getReactQueryWrapper } from '@ppe/common';
import { profilesMock } from '../data/mocks/profiles.mock';
import { getProfilesHydrated } from '../utils/getProfilesHydrated';
import { useProfilesByPreferences } from './useProfilesByPreferences';
import { vi } from 'vitest';

const shiftId = '631a2f25d227da0f33eb1f76';
const profiles = getProfilesHydrated(profilesMock.data).sort((a, b) => a.firstName.localeCompare(b.firstName));

describe('useProfilesByPreferences', () => {
  it('should return all profiles', async () => {
    const { result } = renderHook(() => useProfilesByPreferences(mockedDataSource, shiftId, 'all'), { wrapper: getReactQueryWrapper() });

    result.current.refetch();

    await waitFor(() => expect(result.current.status).toBe('success'));

    expect(result.current.data).toEqual(profiles);
  });

  it('should return profiles with permanent preference', async () => {
    const { result } = renderHook(() => useProfilesByPreferences(mockedDataSource, shiftId, 'permanent'), { wrapper: getReactQueryWrapper() });

    result.current.refetch();

    await waitFor(() => expect(result.current.status).toBe('success'));

    expect(result.current.data).toEqual(profiles);
  });

  it('should return profiles with temporary preference', async () => {
    const { result } = renderHook(() => useProfilesByPreferences(mockedDataSource, shiftId, 'temporary'), { wrapper: getReactQueryWrapper() });

    result.current.refetch();

    await waitFor(() => expect(result.current.status).toBe('success'));

    expect(result.current.data).toEqual(profiles);
  });

  it('should return error on get all profiles', async () => {
    const getProfiles = vi.fn(() => Promise.reject(new Error('api error')));
    const { result } = renderHook(() => useProfilesByPreferences({ ...mockedDataSource, getProfiles }, shiftId, 'all'), {
      wrapper: getReactQueryWrapper(),
    });

    result.current.refetch();

    await waitFor(() => expect(result.current.status).toBe('error'));
    expect((result.current.error as Error).message).toBe('api error');
    expect(result.current.data).toEqual([]);
  });

  it('should return error on get profiles with permanent preference', async () => {
    const getProfilesByPreferences = vi.fn(() => Promise.reject(new Error('api error')));
    const { result } = renderHook(() => useProfilesByPreferences({ ...mockedDataSource, getProfilesByPreferences }, shiftId, 'permanent'), {
      wrapper: getReactQueryWrapper(),
    });

    result.current.refetch();

    await waitFor(() => expect(result.current.status).toBe('error'));
    expect((result.current.error as Error).message).toBe('api error');
    expect(result.current.data).toEqual([]);
  });

  it('should return error on get profiles with temporary preference', async () => {
    const getProfilesByPreferences = vi.fn(() => Promise.reject(new Error('api error')));
    const { result } = renderHook(() => useProfilesByPreferences({ ...mockedDataSource, getProfilesByPreferences }, shiftId, 'temporary'), {
      wrapper: getReactQueryWrapper(),
    });

    result.current.refetch();

    await waitFor(() => expect(result.current.status).toBe('error'));
    expect((result.current.error as Error).message).toBe('api error');
    expect(result.current.data).toEqual([]);
  });
});
