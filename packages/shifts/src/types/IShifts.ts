import { IProfile, profileSchema } from '@ppe/profiles';
import { ISite, siteSchema } from '@ppe/sites';
import { ITeam, teamSchema } from '@ppe/teams';
import { object, array, record } from 'zod';
import { IShift, shiftSchema } from './IShift';

export interface IShifts {
  shifts: IShift[];
  // _sites: Record<string, ISite>;
  // _profiles: Record<string, IProfile>;
  // _teams: Record<string, ITeam>;
}

export const shiftsSchema = object({
  shifts: array(shiftSchema),
  // _sites: record(siteSchema),
  // _profiles: record(profileSchema),
  // _teams: record(teamSchema),
});
