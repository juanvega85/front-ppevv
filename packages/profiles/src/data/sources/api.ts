import { networkingInit } from '@ppe/networking';
import { IProfiles } from '../../types/IProfiles';
import { IDataSource } from '../IDataSource';
import { apiDataSource as apiTeams } from '@ppe/teams';
import { apiDataSource as apiCommon } from '@ppe/common';

const path = '/profiles';

export const apiDataSource = (url: string): IDataSource => {
  const network = networkingInit(url);

  return {
    ...apiTeams(url),
    ...apiCommon(url),
    getProfiles: () => network.get<IProfiles>(path),
    createProfiles: (data) => network.post<IProfiles>(path, data),
    updateProfiles: (data) => network.put<IProfiles>(path, data),
    deleteProfile: (id: string) => network.delete(`${path}/${id}`),

    getProfilesByPreferences: (shiftId, preference) => network.get<IProfiles>(`${path}/shiftscheduling/preferences/${preference}?shiftId=${shiftId}`),
    getProfilesByRole: (roleId: string) => network.get<IProfiles>(`access-control/roles/${roleId}${path}`),
  };
};
