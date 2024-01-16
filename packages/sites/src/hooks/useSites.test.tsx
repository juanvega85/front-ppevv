import { renderHook, waitFor } from '@testing-library/react';
import { useSites } from './useSites';
import { mockedDataSource } from '../data/sources/mocked';
import { sitesMock } from '../data/mocks/sites.mock';
import { getReactQueryWrapper } from '@ppe/common';
import { getSitesHydrated } from '../utils/getSitesHydrated';

const sites = getSitesHydrated(sitesMock.data).sort((a, b) => a.name.localeCompare(b.name));

describe('useSites', () => {
  it('should return sites', async () => {
    const { result } = renderHook(() => useSites(mockedDataSource), { wrapper: getReactQueryWrapper() });

    await waitFor(() => expect(result.current.status).toBe('success'));

    expect(result.current.data).toEqual(sites);
  });

  it('should return error', async () => {
    const getSites = () => Promise.reject(new Error('Api error'));
    const { result } = renderHook(() => useSites({ ...mockedDataSource, getSites }), { wrapper: getReactQueryWrapper() });

    await waitFor(() => expect(result.current.status).toBe('error'));
    expect(result.current.data).toEqual([]);
  });
});
