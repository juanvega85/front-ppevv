import { ILoginResponse } from '../../types/ILoginResponse';

export const loginResponseMock: ILoginResponse = {
  authToken: 'fakeToken',
  userId: '631a2f1cd227da0f33eb1cf2',
  firstName: 'Jhon',
  lastName: 'Doe',
  email: 'test@test.com',
  isSuperUser: false,
  tenants: [
    {
      name: 'Default',
      id: 'tenantId',
    },
    // {
    //   name: 'Other',
    //   id: 'tenantId2',
    // },
  ],
};
