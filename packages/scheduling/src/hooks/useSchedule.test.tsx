import { renderHook, waitFor } from '@testing-library/react';
import { getReactQueryWrapper } from '@ppe/common';
import { scheduleHydratedMock } from '../data/mocks/scheduleHydratedMock';
import { mockedDataSource } from '../data/sources/mocked';
import { useSchedule } from './useSchedule';

const scheduleId = '63591b0d04b2c60d10bb09ed';
const shiftId = '62ae34d43e83340a92863709';

describe('useSchedule', () => {
  it('should return success on get schedule', async () => {
    const { result } = renderHook(() => useSchedule(mockedDataSource, scheduleId, shiftId), { wrapper: getReactQueryWrapper() });

    await waitFor(() => expect(result.current.status).toBe('success'));

    expect(result.current.data).toEqual(scheduleHydratedMock);
  });

  it('should return error on get schedule', async () => {
    const getSchedule = () => Promise.reject(new Error('Api Error'));
    const { result } = renderHook(() => useSchedule({ ...mockedDataSource, getSchedule }, scheduleId, shiftId), { wrapper: getReactQueryWrapper() });

    await waitFor(() => expect(result.current.status).toBe('error'));

    expect(result.current.data).toEqual(undefined);
  });
});
