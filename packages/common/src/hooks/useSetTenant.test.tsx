import { renderHook, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { setTenantResponseMock } from '../data/mocks/setTenantResponse.mock';
import { mockedDataSource } from '../data/sources/mocked';
import { getReactQueryWrapper } from '../utils/reactQueryWrapper';
import { useSetTenant } from './useSetTenant';

const dataTenant = {
  authToken: 'fakeToken',
  tenantId: 'tenantId',
};

describe('useSetTenant', () => {
  it('should call setTenant function success', async () => {
    const setTenant = vi.fn(() => Promise.resolve({ data: setTenantResponseMock }));
    const { result } = renderHook(() => useSetTenant({ ...mockedDataSource, setTenant }), { wrapper: getReactQueryWrapper() });

    result.current.setTenant(dataTenant);

    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(setTenant).toBeCalledTimes(1);
    expect(setTenant).toBeCalledWith(dataTenant);
  });

  it('should call setTenant function error', async () => {
    const setTenant = vi.fn(() => Promise.reject(new Error('api error')));
    const { result } = renderHook(() => useSetTenant({ ...mockedDataSource, setTenant }), { wrapper: getReactQueryWrapper() });

    result.current.setTenant(dataTenant);

    await waitFor(() => expect(result.current.status).toBe('error'));
    expect(setTenant).toBeCalledTimes(1);
    expect(setTenant).toBeCalledWith(dataTenant);
  });
});
