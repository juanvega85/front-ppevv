import { IEntity, entitySchema } from '@ppe/common';
import { string, boolean } from 'zod';
import { ISite } from '@ppe/sites';

export interface IShift extends IEntity {
  site: ISite;
  day: string;
  startTime: string;
  duration: string;
  active: boolean;
}

export const shiftSchema = entitySchema.extend({
  site: entitySchema,
  day: string(),
  startTime: string(),
  duration: string(),
  active: boolean(),
});
