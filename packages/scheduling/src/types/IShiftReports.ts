import { IProfile, profileSchema } from '@ppe/profiles';
import { IShift, shiftSchema } from '@ppe/shifts';
import { ITeam, teamSchema } from '@ppe/teams';
import { object, array, record } from 'zod';
import { IShiftReport, shiftReportSchema } from './IShiftReport';
import { ISite, siteSchema } from '@ppe/sites';

export interface IShiftReports {
  shiftReports: IShiftReport[];
  // _profiles: Record<string, IProfile>;
  // _shifts: Record<string, IShift>;
  // _sites: Record<string, ISite>;
  // _teams: Record<string, ITeam>;
}

export const shiftReportsSchema = object({
  shiftReports: array(shiftReportSchema),
  // _profiles: record(profileSchema),
  // _shifts: record(shiftSchema),
  // _sites: record(siteSchema),
  // _teams: record(teamSchema),
});
