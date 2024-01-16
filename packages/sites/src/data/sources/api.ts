import { networkingInit } from '@ppe/networking';
import { ISites } from '../../types/ISites';
import { IDataSource } from '../IDataSource';
import { apiDataSource as apiProfiles } from '@ppe/profiles';

const path = '/sites';

export const apiDataSource = (url: string): IDataSource => {
  const network = networkingInit(url);

  return {
    ...apiProfiles(url),

    getSites: (params) => network.get<ISites>(path, { params }),
    createSites: (data) => network.post<ISites>(path, data),
    updateSites: (data) => network.put<ISites>(path, data),
    deleteSite: (id: string) => network.delete(`${path}/${id}`),
  };
};
