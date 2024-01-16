import { ILoginData } from '../types/ILoginData';
import { ILoginResponse } from '../types/ILoginResponse';
import { IRecoverPasswordData } from '../types/IRecoverPasswordData';
import { IResetPasswordSendData } from '../types/IResetPasswordSendData';
import { ISetTenantResponse } from '@ppe/authentication';
import { IUsersResponse } from '../types/IUsersResponse';

export interface IResponse<T> {
  data: T;
}

export interface IDataSource {
  login: (data: ILoginData) => Promise<IResponse<ILoginResponse>>;
  setTenant: (data: { tenantId: string; authToken: string }) => Promise<IResponse<ISetTenantResponse>>;
  recoverPassword: (data: IRecoverPasswordData) => Promise<unknown>;
  resetPassword: (data: IResetPasswordSendData) => Promise<unknown>;

  getUserByEmail: (email: string) => Promise<IResponse<IUsersResponse>>;

  getUserRoles: (role: string) => Promise<IResponse<string[]>>;
  updateUserRoles: (params: { userId: string; data: string[] }) => Promise<unknown>;
  getAssignableRoles: () => Promise<IResponse<string[]>>;
}
