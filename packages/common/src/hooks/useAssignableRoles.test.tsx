import { renderHook, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { mockedDataSource } from '../data/sources/mocked';
import { getReactQueryWrapper } from '../utils/reactQueryWrapper';
import { useAssignableRoles } from './useAssignableRoles';

describe('useAssignableRoles', () => {
  it('should return roles', async () => {
    const getAssignableRoles = vi.fn(() => Promise.resolve({ data: ['adminRoleId', 'auditorRoleId', 'managerRoleId'] }));
    const { result } = renderHook(() => useAssignableRoles({ ...mockedDataSource, getAssignableRoles }), { wrapper: getReactQueryWrapper() });

    await waitFor(() => expect(result.current.status).toBe('success'));

    expect(getAssignableRoles).toBeCalledTimes(1);
    expect(result.current.data).toEqual(['adminRoleId', 'auditorRoleId', 'managerRoleId']);
  });
});
