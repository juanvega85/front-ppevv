import { object, array } from 'zod';
import { ITeam, teamSchema } from './ITeam';

export interface ITeams {
  teams: ITeam[];
}

export const teamsSchema = object({
  teams: array(teamSchema),
});
