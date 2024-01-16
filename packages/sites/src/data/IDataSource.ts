import { ISite } from '../types/ISite';
import { IDataSource as IProfilesDataSource } from '@ppe/profiles';
import { IResponse } from '@ppe/networking';
import { ISites } from '../types/ISites';

export interface IDataSource extends IProfilesDataSource {
  getSites: (params?: Record<string, string>) => Promise<IResponse<ISites>>;
  createSites: (data: Omit<ISite, 'id'>[]) => Promise<IResponse<ISites>>;
  updateSites: (data: ISite[]) => Promise<IResponse<ISites>>;
  deleteSite: (id: string) => Promise<unknown>;
}
