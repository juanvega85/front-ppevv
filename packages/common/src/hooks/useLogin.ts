import React from 'react';
import { useMutation } from '@ppe/data-provider';
import { showToast } from '@ppe/ui';
import { useSetTenant } from './useSetTenant';
import { ISession } from '@ppe/authentication';
import { IDataSource } from '../data/IDataSource';
import { ILoginResponse, loginResponseSchema } from '../types/ILoginResponse';
import { handleApiDataError } from '../utils/ApiError';

export const useLogin = (dataSource: IDataSource, initSession: any) => {
  const { login } = dataSource;
  const [dataLogin, setDataLogin] = React.useState<ILoginResponse | null>(null);
  const { setTenant, status: statusSetTenant } = useSetTenant(dataSource);

  const { mutate, status: statusLogin } = useMutation(login, {
    onSuccess: ({ data }) => {
      try {
        loginResponseSchema.parse(data);
        if (data.tenants.length === 1) {
          handleSetTenant(data.tenants[0].id, data);
        } else {
          setDataLogin(data);
        }
      } catch (e) {
        handleApiDataError(e);
      }
    },
    onError: (error: any) => {
      if (error.response.status === 400) {
        showToast(error.response.data, 'error');  
      }else{
        showToast((error as Error).message, 'error');
      }
    },
  });

  const handleSetTenant = (tenantId: string, loginResponse?: ILoginResponse) => {
    const datalogin = loginResponse || dataLogin;
    if (datalogin) {
      const dataSetTenant = { tenantId, authToken: datalogin.authToken };
      setTenant(dataSetTenant, {
        onSuccess: ({ data }) => {
          const session: ISession = {
            userId: datalogin.userId,
            firstName: datalogin.firstName,
            lastName: datalogin.lastName,
            tenantId,
            permissions: data.permissions,
            roles: data.roleIds,
            email: datalogin.email,
            isSuperUser: datalogin.isSuperUser,
          };
          initSession(data.authToken, session);
        },
      });
    }
  };

  return {
    login: mutate,
    status: statusSetTenant,
    isLoading: statusLogin === 'loading' || statusSetTenant === 'loading',
    tenants: dataLogin?.tenants,
    handleSetTenant,
    reset: () => setDataLogin(null),
  };
};
