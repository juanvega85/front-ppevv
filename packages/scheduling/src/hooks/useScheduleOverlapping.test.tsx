import { renderHook, waitFor } from '@testing-library/react';
import { getReactQueryWrapper } from '@ppe/common';
import { mockedDataSource } from '../data/sources/mocked';
import { useScheduleOverlapping } from './useScheduleOverlapping';

const shiftId = '62ae34d43e83340a92863709';
const startDate = '2023-01-1';
const endDate = '2023-01-28';

describe('useScheduleOverlapping', () => {
  it('should return data count greather than 0', async () => {
    const { result } = renderHook(() => useScheduleOverlapping(mockedDataSource, shiftId, startDate, endDate), { wrapper: getReactQueryWrapper() });

    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.data?.count).toBeGreaterThan(0);
  });

  it('should return data count with value 0 when shift id does not exist', async () => {
    const { result } = renderHook(() => useScheduleOverlapping(mockedDataSource, '', startDate, endDate), {
      wrapper: getReactQueryWrapper(),
    });

    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.data?.count).toBe(0);
  });

  it('should return data count with value 0 when startDate does not exist', async () => {
    const { result } = renderHook(() => useScheduleOverlapping(mockedDataSource, shiftId, '', endDate), {
      wrapper: getReactQueryWrapper(),
    });

    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.data?.count).toBe(0);
  });

  it('should return data count with value 0 when endDate does not exist', async () => {
    const { result } = renderHook(() => useScheduleOverlapping(mockedDataSource, shiftId, startDate, ''), {
      wrapper: getReactQueryWrapper(),
    });

    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.data?.count).toBe(0);
  });

  it('should return error', async () => {
    const getScheduleOverlapping = () => Promise.reject(new Error('api error'));
    const { result } = renderHook(() => useScheduleOverlapping({ ...mockedDataSource, getScheduleOverlapping }, shiftId, startDate, endDate), {
      wrapper: getReactQueryWrapper(),
    });

    await waitFor(() => expect(result.current.status).toBe('error'));

    expect(result.current.data).toEqual(undefined);
  });
});
