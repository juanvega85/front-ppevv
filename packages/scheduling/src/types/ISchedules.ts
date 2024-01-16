import { IProfile, profileSchema } from '@ppe/profiles';
import { IShift, shiftSchema } from '@ppe/shifts';
import { ITeam, teamSchema } from '@ppe/teams';
import { object, array, record } from 'zod';
import { ISite, siteSchema } from '@ppe/sites';
import { ISchedule, scheduleSchema } from './ISchedule';

export interface ISchedules {
  schedules: ISchedule[];
  //_profiles: Record<string, IProfile>;
  //_shifts: Record<string, IShift>;
  //_sites: Record<string, ISite>;
  //_teams: Record<string, ITeam>;
}

export const schedulesSchema = object({
  schedules: array(scheduleSchema),
  //_profiles: record(profileSchema),
  //_shifts: record(shiftSchema),
  //_sites: record(siteSchema),
  //_teams: record(teamSchema),
});
