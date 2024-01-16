import { IEntity, entitySchema } from './IEntity';
import { string } from 'zod';

export interface ITenant extends IEntity {
  name: string;
}

export const tenantSchema = entitySchema.extend({
  name: string(),
});
