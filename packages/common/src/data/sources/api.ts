import { networkingInit } from '@ppe/networking';
import { ILoginResponse } from '../../types/ILoginResponse';
import { ISetTenantResponse } from '../../../../authentication/src/types/ISetTenantResponse';
import { IDataSource } from '../IDataSource';

export const apiDataSource = (url: string): IDataSource => {
  const network = networkingInit(url);
  return {
    login: (data) => network.post<ILoginResponse>('/authentication/login', data),
    setTenant: (data) => network.post<ISetTenantResponse>('authentication/tenant', data),
    recoverPassword: (data) => network.post('/authentication/password/recovery', data),
    resetPassword: (data) => network.post('/authentication/password/reset', data),

    getUserByEmail: (email: string) => network.get(`/users?email=${email}`),

    getUserRoles: async (userId: string) => network.get(`access-control/assignments/${userId}`),
    updateUserRoles: (params: { userId: string; data: string[] }) => network.put(`access-control/assignments/${params.userId}`, params.data),
    getAssignableRoles: async () => network.get('access-control/roles'),
  };
};
