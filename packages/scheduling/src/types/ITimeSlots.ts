import { IProfile, profileSchema } from '@ppe/profiles';
import { IShift, shiftSchema } from '@ppe/shifts';
import { ITeam, teamSchema } from '@ppe/teams';
import { object, array, record } from 'zod';
import { ISite, siteSchema } from '@ppe/sites';
import { ITimeSlot } from './ITimeSlot';
import { entitySchema } from '@ppe/common';
import { ISchedule, scheduleSchema } from './ISchedule';

export interface ITimeSlots {
  timeslots: ITimeSlot[];
  // _profiles: Record<string, IProfile>;
  // _shifts: Record<string, IShift>;
  // _sites: Record<string, ISite>;
  // _teams: Record<string, ITeam>;
  // _schedules: Record<string, ISchedule>;
}

export const timeSlotsSchema = object({
  timeslots: array(entitySchema),
  // _profiles: record(profileSchema),
  // _shifts: record(shiftSchema),
  // _sites: record(siteSchema),
  // _teams: record(teamSchema),
  // _schedules: record(scheduleSchema),
});
