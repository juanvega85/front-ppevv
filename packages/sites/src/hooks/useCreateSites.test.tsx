import { renderHook, waitFor } from '@testing-library/react';
import { useCreateSites } from './useCreateSites';
import { mockedDataSource } from '../data/sources/mocked';
import { getReactQueryWrapper } from '@ppe/common';

const site = {
  coordinates: {
    lat: '-33.417241',
    lng: '-70.605285',
  },
  active: true,
  description: 'Costanera Center',
  name: 'Costanera Center',
  secondaryResponsible: [],
  storage: [],
};

describe('useCreateSites', () => {
  it('should returns success on create sites', async () => {
    const { result } = renderHook(() => useCreateSites(mockedDataSource), { wrapper: getReactQueryWrapper() });

    result.current.create([site]);

    await waitFor(() => expect(result.current.status).toBe('success'));
  });

  it('should return error on create sites', async () => {
    const createSites = () => Promise.reject(new Error());
    const { result } = renderHook(() => useCreateSites({ ...mockedDataSource, createSites }), { wrapper: getReactQueryWrapper() });

    result.current.create([site]);

    await waitFor(() => expect(result.current.status).toBe('error'));
  });
});
