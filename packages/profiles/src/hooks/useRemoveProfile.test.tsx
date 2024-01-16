import { renderHook, waitFor } from '@testing-library/react';
import { mockedDataSource } from '../data/sources/mocked';
import { useRemoveProfile } from './useRemoveProfile';
import { getReactQueryWrapper } from '@ppe/common';

describe('useRemoveProfile', () => {
  it('should return status success on remove profiles', async () => {
    const { result } = renderHook(() => useRemoveProfile(mockedDataSource), { wrapper: getReactQueryWrapper() });

    result.current.remove('1234');

    await waitFor(() => expect(result.current.status).toBe('success'));
  });

  it('should return status error on remove profiles', async () => {
    const deleteProfile = () => Promise.reject(new Error('api error'));
    const { result } = renderHook(() => useRemoveProfile({ ...mockedDataSource, deleteProfile }), { wrapper: getReactQueryWrapper() });

    result.current.remove('1234');

    await waitFor(() => expect(result.current.status).toBe('idle'));
    await waitFor(() => expect(result.current.status).toBe('error'));
  });
});
