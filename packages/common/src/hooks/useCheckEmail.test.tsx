import { renderHook, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { mockedDataSource } from '../data/sources/mocked';
import { IUser } from '../types/IUser';
import { getReactQueryWrapper } from '../utils/reactQueryWrapper';
import { useCheckEmail } from './useCheckEmail';

const email = 'email@email.com';

const user: IUser = {
  email,
  firstName: 'paul',
  lastName: 'zoulin',
  active: true,
  tenantIds: ['defaultId'],
  id: '123',
};

describe('useCheckEmail', () => {
  it('should return emailExists false', async () => {
    const getUserByEmail = vi.fn(() => Promise.resolve({ data: [] }));
    const { result } = renderHook(() => useCheckEmail({ ...mockedDataSource, getUserByEmail }), { wrapper: getReactQueryWrapper() });

    await waitFor(() => result.current.setEmail(email));

    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.emailExists).toBeFalsy();
  });

  it('should return emailExists true', async () => {
    const getUserByEmail = vi.fn(() => Promise.resolve({ data: [user] }));
    const { result } = renderHook(() => useCheckEmail({ ...mockedDataSource, getUserByEmail }), { wrapper: getReactQueryWrapper() });

    await waitFor(() => result.current.setEmail(email));

    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.emailExists).toBeTruthy();
  });
});
