import { renderHook, waitFor } from '@testing-library/react';
import { getReactQueryWrapper } from '@ppe/common';
import { mockedDataSource } from '../data/sources/mocked';
import { useUpdateShiftsPreferences } from './useUpdateShiftsPreferences';

describe('useUpdateShiftsPreferences', () => {
  it('should return success on update permanent', async () => {
    const { result } = renderHook(() => useUpdateShiftsPreferences(mockedDataSource), { wrapper: getReactQueryWrapper() });

    result.current.update({
      userId: '62abdd8e89d5bc0ffc129116',
      type: 'permanent',
      data: [],
    });

    await waitFor(() => expect(result.current.status).toBe('success'));
  });

  it('should return success on update temporary', async () => {
    const { result } = renderHook(() => useUpdateShiftsPreferences(mockedDataSource), { wrapper: getReactQueryWrapper() });

    result.current.update({
      userId: '62abdd8e89d5bc0ffc129116',
      type: 'temporary',
      data: [],
    });

    await waitFor(() => expect(result.current.status).toBe('success'));
  });

  it('should return error on update permanent', async () => {
    const updateShiftsPreferences = () => Promise.reject(new Error('test error'));
    const { result } = renderHook(() => useUpdateShiftsPreferences({ ...mockedDataSource, updateShiftsPreferences }), {
      wrapper: getReactQueryWrapper(),
    });

    result.current.update({
      userId: '62abdd8e89d5bc0ffc129116',
      type: 'permanent',
      data: [],
    });

    await waitFor(() => expect(result.current.status).toBe('error'));
  });

  it('should return error on update temporary', async () => {
    const updateShiftsPreferences = () => Promise.reject(new Error('test error'));
    const { result } = renderHook(() => useUpdateShiftsPreferences({ ...mockedDataSource, updateShiftsPreferences }), {
      wrapper: getReactQueryWrapper(),
    });

    result.current.update({
      userId: '62abdd8e89d5bc0ffc129116',
      type: 'temporary',
      data: [],
    });

    await waitFor(() => expect(result.current.status).toBe('error'));
  });
});
