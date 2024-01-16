import { generalPreferencesMock } from '../../data/mocks/generalPreferences.mock';
import { preferencesMock } from '../../data/mocks/preferences.mock';
import { IDataSource } from '../../data/IDataSource';
import { mockedDataSource as mockedShiftsDataSource } from '@ppe/shifts';

export const mockedDataSource: IDataSource = {
  ...mockedShiftsDataSource,

  getShiftsPreferences: () => Promise.resolve({ data: preferencesMock }),
  updateShiftsPreferences: () => Promise.resolve({ data: preferencesMock }),
  getGeneralPreferences: () => Promise.resolve({ data: generalPreferencesMock }),
  updateGeneralPreferences: (params) => Promise.resolve({ data: params.values }),
};
