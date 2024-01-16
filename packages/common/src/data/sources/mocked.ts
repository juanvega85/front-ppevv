import { IDataSource } from '../IDataSource';
import { loginResponseMock } from '../mocks/loginResponse.mock';
import { setTenantResponseMock } from '../mocks/setTenantResponse.mock';

export const mockedDataSource: IDataSource = {
  login: () => Promise.resolve({ data: loginResponseMock }),
  setTenant: () => Promise.resolve({ data: setTenantResponseMock }),
  recoverPassword: () => Promise.resolve(),
  resetPassword: () => Promise.resolve(),

  getUserByEmail: () => Promise.resolve({ data: { users: []} }),

  getUserRoles: () => Promise.resolve({ data: ['adminRoleId'] }),
  updateUserRoles: () => Promise.resolve(),
  getAssignableRoles: () => Promise.resolve({ data: ['adminRoleId', 'auditorRoleId', 'managerRoleId'] }),
};
