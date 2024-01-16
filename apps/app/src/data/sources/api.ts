import { IDataSource } from '../IDataSource';
import { apiDataSource as apiTeamsDataSource } from '@ppe/teams';
import { apiDataSource as apiProfilesSourceTeams } from '@ppe/profiles';
import { apiDataSource as apiSitesSourceTeams } from '@ppe/sites';
import { apiDataSource as apiShiftsSourceTeams } from '@ppe/shifts';
import { apiDataSource as apiPreferencesSourceTeams } from '@ppe/preferences';
import { apiDataSource as apiSchedulingSourceTeams } from '@ppe/scheduling';

export const apiDataSource = (url: string): IDataSource => {
  return {
    ...apiTeamsDataSource(url),
    ...apiProfilesSourceTeams(url),
    ...apiSitesSourceTeams(url),
    ...apiShiftsSourceTeams(url),
    ...apiPreferencesSourceTeams(url),
    ...apiSchedulingSourceTeams(url),
  };
};
