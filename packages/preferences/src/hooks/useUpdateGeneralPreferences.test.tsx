import { renderHook, waitFor } from '@testing-library/react';
import { getReactQueryWrapper } from '@ppe/common';
import { mockedDataSource } from '../data/sources/mocked';
import { useUpdateGeneralPreferences } from './useUpdateGeneralPreferences';

describe('useUpdateGeneralPreferences', () => {
  it('should return success on update', async () => {
    const { result } = renderHook(() => useUpdateGeneralPreferences(mockedDataSource), { wrapper: getReactQueryWrapper() });

    result.current.update({
      userId: '62abdd8e89d5bc0ffc129116',
      values: {
        enableForReplacements: true,
      },
    });

    await waitFor(() => expect(result.current.status).toBe('success'));
  });

  it('should return error on update', async () => {
    const updateGeneralPreferences = () => Promise.reject(new Error('test error'));
    const { result } = renderHook(() => useUpdateGeneralPreferences({ ...mockedDataSource, updateGeneralPreferences }), {
      wrapper: getReactQueryWrapper(),
    });

    result.current.update({
      userId: '62abdd8e89d5bc0ffc129116',
      values: {
        enableForReplacements: true,
      },
    });

    await waitFor(() => expect(result.current.status).toBe('error'));
  });
});
