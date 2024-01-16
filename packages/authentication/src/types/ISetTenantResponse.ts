import { object, string, array } from 'zod';
import { accessPermissionSchema, IAccessPermission } from './IAccessPermission';

export interface ISetTenantResponse {
  authToken: string;
  permissions: IAccessPermission[];
  roleIds: string[];
}

export const setTenantResponseSchema = object({
  authToken: string(),
  permissions: array(accessPermissionSchema),
  roleIds: array(string()),
});
