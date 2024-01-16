import { renderHook, waitFor } from '@testing-library/react';
import { getReactQueryWrapper } from '@ppe/common';
import { mockedDataSource } from '../data/sources/mocked';
import { useShiftsPreferences } from './useShiftsPreferences';

const userId = '62abdd8e89d5bc0ffc129116';

describe('useShiftsPreferences', () => {
  it('should return shift preferences permanent on success', async () => {
    const { result } = renderHook(() => useShiftsPreferences(mockedDataSource, 'permanent', userId), { wrapper: getReactQueryWrapper() });

    await waitFor(() => expect(result.current.status).toBe('success'));

    expect(result.current.shiftsSelected).toEqual(['631a2f25d227da0f33eb1f76', '631a2f25d227da0f33eb1f8c']);
    expect(result.current.sitesSelected).toEqual(['631a2f24d227da0f33eb1ea1', '631a2f24d227da0f33eb1ea2']);
    expect(result.current.daysSelected).toEqual(['0Monday', '2Wednesday']);
    expect(result.current.toggleDay).toBeDefined();
    expect(result.current.toggleShift).toBeDefined();
    expect(result.current.toggleSite).toBeDefined();

    const shifts = result.current.shifts.splice(0, 2);
    expect(shifts).toEqual([
      {
        site: {
          coordinates: { lat: '-33.417241', lng: '-70.605285' },
          active: true,
          description: 'Costanera Center',
          name: 'Costanera Center',
          id: '631a2f24d227da0f33eb1ea1',
          secondaryResponsible: [],
          storage: [],
        },
        active: true,
        duration: '08:00:00',
        startTime: '08:00:00',
        day: '0Monday',
        id: '631a2f25d227da0f33eb1f76',
      },
      {
        site: {
          coordinates: { lat: '-33.417241', lng: '-70.605285' },
          active: true,
          description: 'Costanera Center',
          name: 'Costanera Center',
          id: '631a2f24d227da0f33eb1ea1',
          secondaryResponsible: [],
          storage: [],
        },
        active: true,
        duration: '07:59:00',
        startTime: '16:00:00',
        day: '0Monday',
        id: '631a2f25d227da0f33eb1f77',
      },
    ]);
  });

  it('should return shift preferences temporary on success', async () => {
    const { result } = renderHook(() => useShiftsPreferences(mockedDataSource, 'temporary', userId), { wrapper: getReactQueryWrapper() });

    await waitFor(() => expect(result.current.status).toBe('success'));

    expect(result.current.shiftsSelected).toEqual(['631a2f25d227da0f33eb1f76', '631a2f25d227da0f33eb1f8c']);
    expect(result.current.sitesSelected).toEqual(['631a2f24d227da0f33eb1ea1', '631a2f24d227da0f33eb1ea2']);
    expect(result.current.daysSelected).toEqual(['0Monday', '2Wednesday']);
    expect(result.current.toggleDay).toBeDefined();
    expect(result.current.toggleShift).toBeDefined();
    expect(result.current.toggleSite).toBeDefined();

    const shifts = result.current.shifts.splice(0, 2);
    expect(shifts).toEqual([
      {
        site: {
          coordinates: { lat: '-33.417241', lng: '-70.605285' },
          active: true,
          description: 'Costanera Center',
          name: 'Costanera Center',
          id: '631a2f24d227da0f33eb1ea1',
          secondaryResponsible: [],
          storage: [],
        },
        active: true,
        duration: '08:00:00',
        startTime: '08:00:00',
        day: '0Monday',
        id: '631a2f25d227da0f33eb1f76',
      },
      {
        site: {
          coordinates: { lat: '-33.417241', lng: '-70.605285' },
          active: true,
          description: 'Costanera Center',
          name: 'Costanera Center',
          id: '631a2f24d227da0f33eb1ea1',
          secondaryResponsible: [],
          storage: [],
        },
        active: true,
        duration: '07:59:00',
        startTime: '16:00:00',
        day: '0Monday',
        id: '631a2f25d227da0f33eb1f77',
      },
    ]);
  });

  it('should return empty data on error as permanent', async () => {
    const getShiftsPreferences = () => Promise.reject(new Error('test error'));
    const { result } = renderHook(() => useShiftsPreferences({ ...mockedDataSource, getShiftsPreferences }, 'permanent', userId), {
      wrapper: getReactQueryWrapper(),
    });

    await waitFor(() => expect(result.current.status).toBe('error'));

    expect(result.current.shiftsSelected).toEqual([]);
    expect(result.current.sitesSelected).toEqual([]);
    expect(result.current.daysSelected).toEqual([]);
  });

  it('should return empty data on error as temporary', async () => {
    const getShiftsPreferences = () => Promise.reject(new Error('test error'));
    const { result } = renderHook(() => useShiftsPreferences({ ...mockedDataSource, getShiftsPreferences }, 'temporary', userId), {
      wrapper: getReactQueryWrapper(),
    });

    await waitFor(() => expect(result.current.status).toBe('error'));

    expect(result.current.shiftsSelected).toEqual([]);
    expect(result.current.sitesSelected).toEqual([]);
    expect(result.current.daysSelected).toEqual([]);
  });
});
