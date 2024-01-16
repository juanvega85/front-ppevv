import { IProfile, profileSchema } from '@ppe/profiles';
import { ITeam, teamSchema } from '@ppe/teams';
import { object, array, record } from 'zod';
import { ISite, siteSchema } from './ISite';

export interface ISites {
  sites: ISite[];
  //_profiles: Record<string, IProfile>;
  //_teams: Record<string, ITeam>;
}

export const sitesSchema = object({
  sites: array(siteSchema),
  //_profiles: record(profileSchema),
  //_teams: record(teamSchema),
});
