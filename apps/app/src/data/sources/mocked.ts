import { IDataSource } from '../../data/IDataSource';
import { mockedDataSource as mockedTeamsDataSource } from '@ppe/teams';
import { mockedDataSource as mockedProfilesDataSource } from '@ppe/profiles';
import { mockedDataSource as mockedSitesDataSource } from '@ppe/sites';
import { mockedDataSource as mockedShiftsDataSource } from '@ppe/shifts';
import { mockedDataSource as mockedPreferencesDataSource } from '@ppe/preferences';
import { mockedDataSource as mockedSchedulingDataSource } from '@ppe/scheduling';

export const mockedDataSource: IDataSource = {
  ...mockedTeamsDataSource,
  ...mockedProfilesDataSource,
  ...mockedSitesDataSource,
  ...mockedShiftsDataSource,
  ...mockedPreferencesDataSource,
  ...mockedSchedulingDataSource,
};
