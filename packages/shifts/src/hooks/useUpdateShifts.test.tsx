import { renderHook, waitFor } from '@testing-library/react';
import { useUpdateShifts } from './useUpdateShifts';
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
  id: '631a2f25d227da0f33eb1f76',
};

// describe('useUpdateShifts', () => {
//   it('should returns success on update shift', async () => {
//     const { result } = renderHook(() => useUpdateShifts(mockedDataSource), { wrapper: getReactQueryWrapper() });

//     result.current.update([shift]);

//     await waitFor(() => expect(result.current.status).toBe('success'));
//   });

//   it('should returns error on update shift', async () => {
//     const updateShifts = () => Promise.reject(new Error());
//     const { result } = renderHook(() => useUpdateShifts({ ...mockedDataSource, updateShifts }), { wrapper: getReactQueryWrapper() });

//     result.current.update([shift]);

//     await waitFor(() => expect(result.current.status).toBe('error'));
//   });
// });
