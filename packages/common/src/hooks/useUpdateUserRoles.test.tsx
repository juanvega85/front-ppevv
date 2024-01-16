import { renderHook, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { mockedDataSource } from '../data/sources/mocked';
import { getReactQueryWrapper } from '../utils/reactQueryWrapper';
import { useUpdateUserRoles } from './useUpdateUserRoles';

const data = {
  userId: '1234',
  data: ['adminRoleId'],
};

describe('useUpdateUserRoles', () => {
  it('should call updateUserRoles function success', async () => {
    const updateUserRoles = vi.fn(() => Promise.resolve());
    const { result } = renderHook(() => useUpdateUserRoles({ ...mockedDataSource, updateUserRoles }), { wrapper: getReactQueryWrapper() });

    result.current.update(data);

    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(updateUserRoles).toBeCalledTimes(1);
    expect(updateUserRoles).toBeCalledWith(data);
  });

  it('should call updateUserRoles function error', async () => {
    const updateUserRoles = vi.fn(() => Promise.reject(new Error('api error')));
    const { result } = renderHook(() => useUpdateUserRoles({ ...mockedDataSource, updateUserRoles }), { wrapper: getReactQueryWrapper() });

    result.current.update(data);

    await waitFor(() => expect(result.current.status).toBe('error'));
    expect(updateUserRoles).toBeCalledTimes(1);
    expect(updateUserRoles).toBeCalledWith(data);
  });
});
