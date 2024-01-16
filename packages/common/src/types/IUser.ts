import { boolean, string } from 'zod';
import { IEntity, entitySchema } from './IEntity';

export interface IUser extends IEntity {
  email: string;
  firstName: string;
  lastName: string;
  active: boolean;
  tenantIds: string[];
  password?: string; // only used when POSTing new users if a password is being included
}

export const userSchema = entitySchema.extend({
  email: string(),
  firstName: string(),
  lastName: string(),
  active: boolean(),
  tenantIds: string().array(),
  password: string().optional(),
});
