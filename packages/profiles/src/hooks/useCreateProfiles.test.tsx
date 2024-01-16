import { renderHook, waitFor } from '@testing-library/react';
import { mockedDataSource } from '../data/sources/mocked';
import { useCreateProfiles } from './useCreateProfiles';
import { getReactQueryWrapper } from '@ppe/common';

const data = {
  address: {
    coordinates: { lat: '-32.9750338', lng: '-71.539247' },
    country: 'Chile',
    region: 'Valparaíso',
    city: 'Valparaiso',
    locality: 'Viña del Mar',
    unit: '302',
    route: 'Los Sargazos',
    streetNumber: '376',
    formattedAddress: 'Los Sargazos 376, Viña del Mar, Valparaíso, Chile',
    description: 'Los Sargazos 376, Viña del Mar, Chile',
  },
  team: { id: '62abdd3d89d5bc0ffc129115' },
  languages: ['Spanish', 'English', 'Arabic'],
  maritalStatus: 'Married',
  gender: 'Male',
  appointedCapacity: 'Elder',
  serviceCapacity: 'RegularPioneer',
  birthDate: '1972-04-13',
  mobilePhone: '',
  landlinePhone: '',
  baptismDate: '1987-12-19',
  lastName: 'Zoulin',
  firstName: 'Paul',
  email: 'toochevere@gmail.com',
};

describe('useCreateProfiles', () => {
  it('should return status success on create profiles', async () => {
    const { result } = renderHook(() => useCreateProfiles(mockedDataSource), { wrapper: getReactQueryWrapper() });

    result.current.create([data]);

    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.newProfile).toEqual({ ...data, id: '62abdd8e89d5bc0ffc129116' });
  });

  it('should return status error on create profiles', async () => {
    const createProfiles = () => Promise.reject(new Error('Api error'));
    const { result } = renderHook(() => useCreateProfiles({ ...mockedDataSource, createProfiles }), { wrapper: getReactQueryWrapper() });

    result.current.create([data]);

    await waitFor(() => expect(result.current.status).toBe('error'));
    expect(result.current.newProfile).toBeNull();
  });
});
