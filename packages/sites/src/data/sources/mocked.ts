import { sitesMock } from '../mocks/sites.mock';
import { IDataSource } from '../IDataSource';
import { mockedDataSource as mockedProfilesDataSource } from '@ppe/profiles';

export const mockedDataSource: IDataSource = {
  ...mockedProfilesDataSource,
  getSites: () => Promise.resolve(sitesMock),
  createSites: () => Promise.resolve(sitesMock),
  updateSites: () => Promise.resolve(sitesMock),
  deleteSite: () => Promise.resolve(),
};
