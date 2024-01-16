import { ITeam, teamSchema } from '@ppe/teams';
import { object, array, record } from 'zod';
import { IProfile, profileSchema } from './IProfile';

export interface IProfiles {
  profiles: IProfile[];
}

export const profilesSchema = object({
  profiles: array(profileSchema),
  //_teams: record(teamSchema),
});
