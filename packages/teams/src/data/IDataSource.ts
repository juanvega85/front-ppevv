import { ITeam } from '../types/ITeam';
import { IResponse } from '@ppe/networking';
import { ITeams } from '../types/ITeams';

export interface IDataSource {
  getTeams: () => Promise<IResponse<ITeams>>;
  createTeams: (data: Omit<ITeam, 'id'>[]) => Promise<IResponse<ITeams>>;
  updateTeams: (data: ITeam[]) => Promise<IResponse<ITeams>>;
  deleteTeam: (id: string) => Promise<unknown>;
}
