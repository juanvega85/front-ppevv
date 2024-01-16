import { renderHook, waitFor } from '@testing-library/react';
import { useUpdateSites } from './useUpdateSites';
import { mockedDataSource } from '../data/sources/mocked';
import { getReactQueryWrapper } from '@ppe/common';
import { sitesMock } from '../data/mocks/sites.mock';

describe('useUpdateSites', () => {
  it('should returns success on edit sites', async () => {
    const { result } = renderHook(() => useUpdateSites(mockedDataSource), { wrapper: getReactQueryWrapper() });

    result.current.update([sitesMock.data.sites[0]]);

    await waitFor(() => expect(result.current.status).toBe('success'));
  });

  it('should returns error on edit sites', async () => {
    const updateSites = () => Promise.reject(new Error());
    const { result } = renderHook(() => useUpdateSites({ ...mockedDataSource, updateSites }), { wrapper: getReactQueryWrapper() });

    result.current.update([sitesMock.data.sites[0]]);

    await waitFor(() => expect(result.current.status).toBe('error'));
  });
});
