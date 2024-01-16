import { renderHook, waitFor } from '@testing-library/react';
import { getReactQueryWrapper } from '@ppe/common';
import { mockedDataSource } from '../data/sources/mocked';
import { useCreateReport } from './useCreateReport';

const data = {
  shiftId: '62ae34d43e83340a92863709',
  data: [
    {
      shift: { id: '62ae34d43e83340a92863709' },
      date: '2022-10-03',
      users: [{ id: '62b0a4e43e83340a9286372d' }],
      activity: { Books: '2', Brochure: '2', Videos: '2' },
      notes: 'Test note',
    },
  ],
};

describe('useCreateReport', () => {
  it('should return status success on create report', async () => {
    const { result } = renderHook(() => useCreateReport(mockedDataSource), { wrapper: getReactQueryWrapper() });

    result.current.create(data);

    await waitFor(() => expect(result.current.status).toBe('success'));
  });

  it('should return status error on create report', async () => {
    const createReport = () => Promise.reject(new Error('Api error'));
    const { result } = renderHook(() => useCreateReport({ ...mockedDataSource, createReport }), { wrapper: getReactQueryWrapper() });

    result.current.create(data);

    await waitFor(() => expect(result.current.status).toBe('error'));
  });
});
