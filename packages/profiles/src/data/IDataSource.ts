import { IDataSource as ICommonDataSource } from '@ppe/common';
import { IDataSource as ITeamsDataSource } from '@ppe/teams';
import { IResponse } from '@ppe/networking';
import { IProfiles } from '../types/IProfiles';
import { IProfile } from '../types/IProfile';

export interface IDataSource extends ICommonDataSource, ITeamsDataSource {
  getProfiles: () => Promise<IResponse<IProfiles>>;
  createProfiles: (data: Omit<IProfile, 'id'>[]) => Promise<IResponse<IProfiles>>;
  updateProfiles: (data: IProfile[]) => Promise<IResponse<IProfiles>>;
  deleteProfile: (id: string) => Promise<unknown>;

  getProfilesByPreferences: (shiftId: string, preference: string) => Promise<IResponse<IProfiles>>;
  getProfilesByRole: (roleId: string) => Promise<IResponse<IProfiles>>;
}
