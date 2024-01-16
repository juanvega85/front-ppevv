import { object, string } from 'zod';

export interface IAccessPermission {
  resource: string;
  actions: string;
}

export const accessPermissionSchema = object({
  resource: string(),
  actions: string(),
});
