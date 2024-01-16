import { IDataSource } from '../IDataSource';
import { apiDataSource as apiSchedulingSourceTeams } from '@ppe/scheduling';

export const apiDataSource = (url: string): IDataSource => {
  return {
    ...apiSchedulingSourceTeams(url),
  };
};
