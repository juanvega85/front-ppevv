import { renderHook, waitFor } from '@testing-library/react';
import { useCreateShifts } from './useCreateShifts';
import { mockedDataSource } from '../data/sources/mocked';
import { getReactQueryWrapper } from '@ppe/common';

const shift = {
  site: {
    id: '631a2f24d227da0f33eb1ea1',
  },
  active: true,
  duration: '08:00:00',
  startTime: '08:00:00',
  day: '0Monday',
};

// describe('useCreateShifts', () => {
//   it('should returns success on create shifts', async () => {
//     const { result } = renderHook(() => useCreateShifts(mockedDataSource), { wrapper: getReactQueryWrapper() });

//     result.current.create([shift]);

//     await waitFor(() => expect(result.current.status).toBe('success'));
//   });

//   it('should return error on create shifts', async () => {
//     const createShifts = () => Promise.reject(new Error());
//     const { result } = renderHook(() => useCreateShifts({ ...mockedDataSource, createShifts }), { wrapper: getReactQueryWrapper() });

//     result.current.create([shift]);

//     await waitFor(() => expect(result.current.status).toBe('error'));
//   });
// });
