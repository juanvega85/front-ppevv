import { string, array } from 'zod';
import { IShift } from '@ppe/shifts';
import { IProfile } from '@ppe/profiles';
import { entitySchema, IEntity } from '@ppe/common';

export interface ISchedule extends IEntity {
  shift: IShift;
  periodStartDay: string;
  periodEndDay: string;
  assigned:  IEntity[] | IProfile[] ;
  notes: string[];
}

export const scheduleSchema = entitySchema.extend({
  shift: entitySchema,
  periodStartDay: string(),
  periodEndDay: string(),
  assigned: array(entitySchema),
  notes: array(string()),
});
