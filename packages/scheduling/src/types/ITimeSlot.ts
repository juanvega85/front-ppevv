import { ISchedule } from './ISchedule';
import { IShift } from '@ppe/shifts';
import { boolean, string, array } from 'zod';
import { IEntity, entitySchema } from '@ppe/common';
import { IProfile } from '@ppe/profiles';

export interface ITimeSlot extends IEntity {
  schedule: ISchedule;
  shift: IShift;
  date: string;
  timeOfDay: string;
  duration: string;
  assigned: IProfile[];
  notes: string[];
  isException: boolean;
  active: boolean;
}

export const timeSlotSchema = entitySchema.extend({
  schedule: entitySchema,
  shift: entitySchema,
  date: string(),
  timeOfDay: string(),
  duration: string(),
  assigned: array(entitySchema),
  notes: array(string()),
  isException: boolean(),
  active: boolean(),
});
//////
