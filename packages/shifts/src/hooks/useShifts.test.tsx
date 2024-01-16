import { renderHook, waitFor } from '@testing-library/react';
import { useShifts } from './useShifts';
import { mockedDataSource } from '../data/sources/mocked';
import { shiftsMock } from '../data/mocks/shifts.mock';
import { getShiftsHydrated } from '../utils/getShiftsHydrated';
import { getReactQueryWrapper } from '@ppe/common';

const shifts = getShiftsHydrated(shiftsMock.data);

describe('useShifts', () => {
  it('should return shifts without params', async () => {
    const { result } = renderHook(() => useShifts(mockedDataSource), { wrapper: getReactQueryWrapper() });

    await waitFor(() => expect(result.current.status).toBe('success'));

    expect(result.current.data).toEqual(shifts);
  });

  it('should return shifts with params', async () => {
    const params = {
      active: 'true',
      siteId: '631a2f24d227da0f33eb1ea1',
      dayOfTheWeek: '0Monday',
    };
    const shiftsFiltered = shifts.filter((s) => s.site.id === params.siteId && s.day === params.dayOfTheWeek);

    const { result } = renderHook(() => useShifts(mockedDataSource, params), { wrapper: getReactQueryWrapper() });

    await waitFor(() => expect(result.current.status).toBe('success'));

    expect(result.current.data).toEqual(shiftsFiltered);
  });

  it('should return error', async () => {
    const getShifts = () => Promise.reject(new Error('Api error'));
    const { result } = renderHook(() => useShifts({ ...mockedDataSource, getShifts }), { wrapper: getReactQueryWrapper() });

    await waitFor(() => expect(result.current.status).toBe('error'));
    expect(result.current.data).toEqual([]);
  });
});
