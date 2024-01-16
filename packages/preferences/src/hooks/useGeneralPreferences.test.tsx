import { renderHook, waitFor } from '@testing-library/react';
import { getReactQueryWrapper } from '@ppe/common';
import { mockedDataSource } from '../data/sources/mocked';
import { useGeneralPreferences } from './useGeneralPreferences';

const userId = '62abdd8e89d5bc0ffc129116';

describe('useGeneralPreferences', () => {
  it('should return success on get general preferences', async () => {
    const { result } = renderHook(() => useGeneralPreferences(mockedDataSource, userId), { wrapper: getReactQueryWrapper() });

    await waitFor(() => expect(result.current.status).toBe('success'));

    expect(result.current.data).toEqual({ enableForReplacements: true });
  });

  it('should return error on get general preferences', async () => {
    const getGeneralPreferences = () => Promise.reject(new Error('test error'));
    const { result } = renderHook(() => useGeneralPreferences({ ...mockedDataSource, getGeneralPreferences }, userId), {
      wrapper: getReactQueryWrapper(),
    });

    await waitFor(() => expect(result.current.status).toBe('error'));
  });
});
