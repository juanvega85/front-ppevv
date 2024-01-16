import { renderHook, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { mockedDataSource } from '../data/sources/mocked';
import { getReactQueryWrapper } from '../utils/reactQueryWrapper';
import { useUserRoles } from './useUserRoles';

describe('useUserRoles', () => {
  it('should return user roles', async () => {
    const userId = '1234';
    const getUserRoles = vi.fn(() => Promise.resolve({ data: ['adminRoleId'] }));
    const { result } = renderHook(() => useUserRoles({ ...mockedDataSource, getUserRoles }, userId), { wrapper: getReactQueryWrapper() });

    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(getUserRoles).toBeCalledTimes(1);
    expect(result.current.data).toEqual(['adminRoleId']);
  });
});
