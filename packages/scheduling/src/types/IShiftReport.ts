import { IShift } from '@ppe/shifts';
import { string, array, record } from 'zod';
import { IEntity, entitySchema } from '@ppe/common';
import { IProfile } from '@ppe/profiles';

export interface IShiftReport extends IEntity {
  shift:  IShift | IEntity;
  date: string;
  users: IProfile[] | IEntity[];
  activity: { [key: string]: string };
  notes?: string;
}

export const shiftReportSchema = entitySchema.extend({
  shift: entitySchema,
  date: string(),
  users: array(entitySchema),
  activity: record(string().min(1), string().min(1)),
  notes: string().optional(),
});
