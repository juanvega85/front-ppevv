import { networkingInit } from '@ppe/networking';
import { IShifts } from '../../types/IShifts';
import { IShift } from '../../types/IShift';
import { IDataSource } from '../IDataSource';
import { apiDataSource as apiSitesSourceTeams } from '@ppe/sites';

const path = '/shiftscheduling/shifts';

export const apiDataSource = (url: string): IDataSource => {
  const network = networkingInit(url);

  return {
    ...apiSitesSourceTeams(url),

    getShifts: (params) => network.get<IShifts>(path, { params }),
    createShifts: (data: Omit<IShift, 'id'>[]) => network.post(path, data),
    updateShifts: (data) => network.put<IShifts>(path, data),
    deleteShift: (id) => network.delete(`${path}/${id}`),
  };
};
