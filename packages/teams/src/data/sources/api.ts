import { networkingInit } from '@ppe/networking';
import { ITeams } from '../../types/ITeams';
import { IDataSource } from '../IDataSource';

const path = '/teams';

export const apiDataSource = (url: string): IDataSource => {
  const network = networkingInit(url);

  return {
    getTeams: () => network.get<ITeams>(path),
    createTeams: (data) => network.post<ITeams>(path, data),
    updateTeams: (data) => network.put<ITeams>(path, data),
    deleteTeam: (id: string) => network.delete(`${path}/${id}`),
  };
};
