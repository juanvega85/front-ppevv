import { IAccessPermission } from './IAccessPermission';

export interface ISession {
  userId: string;
  firstName: string;
  lastName: string;
  tenantId: string;
  permissions: IAccessPermission[];
  roles: string[];
  email: string;
  isSuperUser: boolean;
}
