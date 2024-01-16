import { teamsMock } from '../mocks/teams.mock';
import { IDataSource } from '../IDataSource';

export const mockedDataSource: IDataSource = {
  getTeams: () => Promise.resolve(teamsMock),
  createTeams: (data) => Promise.resolve({ data: { teams: [{ name: data[0].name, id: '1234' }] } }),
  updateTeams: (teams) => Promise.resolve({ data: { teams } }),
  deleteTeam: () => Promise.resolve(),
};
