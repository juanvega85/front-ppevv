import { renderHook, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { mockedDataSource } from '../data/sources/mocked';
import { getReactQueryWrapper } from '../utils/reactQueryWrapper';
import { useRecoverPassword } from './useRecoverPassword';

const recoverData = {
  email: 'email@email.com',
};

describe('useRecoverPassword', () => {
  it('should call recoverPassword success', async () => {
    const recoverPassword = vi.fn(() => Promise.resolve());

    const { result } = renderHook(() => useRecoverPassword({ ...mockedDataSource, recoverPassword }), { wrapper: getReactQueryWrapper() });

    result.current.recoverPassword(recoverData);

    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(recoverPassword).toBeCalledTimes(1);
    expect(recoverPassword).toBeCalledWith(recoverData);
  });

  it('should call recoverPassword error', async () => {
    const recoverPassword = vi.fn(() => Promise.reject(new Error('api error')));

    const { result } = renderHook(() => useRecoverPassword({ ...mockedDataSource, recoverPassword }), { wrapper: getReactQueryWrapper() });

    result.current.recoverPassword(recoverData);

    await waitFor(() => expect(result.current.status).toBe('error'));
    expect(recoverPassword).toBeCalledTimes(1);
  });
});
