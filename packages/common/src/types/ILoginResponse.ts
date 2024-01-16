import { object, string, array, boolean } from 'zod';
import { ITenant, tenantSchema } from './ITenant';

export interface ILoginResponse {
  authToken: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  tenants: ITenant[];
  isSuperUser: boolean;
}

export const loginResponseSchema = object({
  authToken: string(),
  userId: string(),
  firstName: string(),
  lastName: string(),
  email: string(),
  tenants: array(tenantSchema),
  isSuperUser: boolean(),
});
