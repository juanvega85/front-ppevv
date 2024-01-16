import { IDataSource } from '../IDataSource';
import { profilesMock } from '../mocks/profiles.mock';
import { mockedDataSource as mockedCommonDataSource } from '@ppe/common';
import { mockedDataSource as mockedTeamsDataSource } from '@ppe/teams';

export const mockedDataSource: IDataSource = {
  ...mockedCommonDataSource,
  ...mockedTeamsDataSource,
  getProfiles: () => Promise.resolve(profilesMock),
  createProfiles: () => Promise.resolve(profilesMock),
  updateProfiles: (data) => Promise.resolve({ data: { profiles: data, _teams: {} } }),
  deleteProfile: () => Promise.resolve(),

  getProfilesByPreferences: () => Promise.resolve(profilesMock),
  getProfilesByRole: () => Promise.resolve(profilesMock),
};
