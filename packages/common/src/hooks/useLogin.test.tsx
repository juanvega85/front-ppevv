import { renderHook, waitFor } from '@testing-library/react';
import { mockedDataSource } from '../data/sources/mocked';
import { getReactQueryWrapper } from '../utils/reactQueryWrapper';
import { useLogin } from './useLogin';
import { vi } from 'vitest';
import { loginResponseMock } from '../data/mocks/loginResponse.mock';
import { setTenantResponseMock } from '../data/mocks/setTenantResponse.mock';

const loginData = {
  email: 'user0@shifty.test',
  password: 'password',
};

const loginResponseMockTwoTenants = {
  ...loginResponseMock,
  tenants: [
    {
      name: 'Default',
      id: 'tenantId',
    },
    {
      name: 'Other',
      id: 'tenantId2',
    },
  ],
};

describe('useLogin', () => {
  it('should login success with one tenant', async () => {
    const initSession = vi.fn(() => {});
    const login = vi.fn(() => Promise.resolve({ data: loginResponseMock }));

    const { result } = renderHook(() => useLogin({ ...mockedDataSource, login }, initSession), { wrapper: getReactQueryWrapper() });

    result.current.login(loginData);

    await waitFor(() => expect(result.current.isLoading).toBeFalsy());

    await waitFor(() => expect(result.current.status).toBe('success'));

    expect(initSession).toBeCalledTimes(1);
  });

  it('should login success with two or more tenants', async () => {
    const initSession = vi.fn(() => {});
    const login = vi.fn(() => Promise.resolve({ data: loginResponseMockTwoTenants }));
    const setTenant = vi.fn(() => Promise.resolve({ data: setTenantResponseMock }));

    const { result } = renderHook(() => useLogin({ ...mockedDataSource, login, setTenant }, initSession), { wrapper: getReactQueryWrapper() });

    result.current.login(loginData);

    await waitFor(() => expect(login).toBeCalledTimes(1));
    expect(login).toBeCalledWith(loginData);

    await waitFor(() => expect(result.current.isLoading).toBeFalsy());

    result.current.handleSetTenant('tenantId', loginResponseMockTwoTenants);

    await waitFor(() => expect(setTenant).toBeCalledTimes(1));
    expect(setTenant).toBeCalledWith({
      tenantId: 'tenantId',
      authToken: loginResponseMockTwoTenants.authToken,
    });

    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(initSession).toBeCalledTimes(1);
    expect(result.current.tenants).toEqual([
      {
        name: 'Default',
        id: 'tenantId',
      },
      {
        name: 'Other',
        id: 'tenantId2',
      },
    ]);
  });
});
