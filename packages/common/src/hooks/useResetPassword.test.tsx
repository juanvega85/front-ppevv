import { renderHook, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { mockedDataSource } from '../data/sources/mocked';
import { getReactQueryWrapper } from '../utils/reactQueryWrapper';
import { useResetPassword } from './useResetPassword';

const resetData = {
  email: 'email@email.com',
  oldPassword: '123456',
  newPassword: '789456',
};

describe('useResetPassword', () => {
  it('should call resetPassword success', async () => {
    const resetPassword = vi.fn(() => Promise.resolve());

    const { result } = renderHook(() => useResetPassword({ ...mockedDataSource, resetPassword }), { wrapper: getReactQueryWrapper() });

    result.current.resetPassword(resetData);

    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(resetPassword).toBeCalledTimes(1);
    expect(resetPassword).toBeCalledWith(resetData);
  });

  it('should call resetPassword error', async () => {
    const resetPassword = vi.fn(() => Promise.reject(new Error('api error')));

    const { result } = renderHook(() => useResetPassword({ ...mockedDataSource, resetPassword }), { wrapper: getReactQueryWrapper() });

    result.current.resetPassword(resetData);

    await waitFor(() => expect(result.current.status).toBe('error'));
    expect(resetPassword).toBeCalledTimes(1);
  });
});
