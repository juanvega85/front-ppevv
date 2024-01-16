import { networkingInit } from '@ppe/networking';
import { IGeneralPreference } from '../../types/IGeneralPreference';
import { PreferencesType } from '../../types/PreferencesType';
import { IDataSource } from '../IDataSource';
import { apiDataSource as apiShiftsSourceTeams } from '@ppe/shifts';

export const apiDataSource = (url: string): IDataSource => {
  const network = networkingInit(url);

  return {
    ...apiShiftsSourceTeams(url),

    getGeneralPreferences: (userId) => network.get(`profiles/${userId}/shiftscheduling/preferences`),
    updateGeneralPreferences: (params: { userId: string; values: IGeneralPreference }) =>
      network.put(`/profiles/${params.userId}/shiftscheduling/preferences`, params.values),

    getShiftsPreferences: (userId, type) => network.get(`/profiles/${userId}/shiftscheduling/preferences/assignments/${type}`),
    updateShiftsPreferences: (params: { userId: string; type: PreferencesType; data: string[] }) =>
      network.put(`/profiles/${params.userId}/shiftscheduling/preferences/assignments/${params.type}`, params.data),
  };
};
