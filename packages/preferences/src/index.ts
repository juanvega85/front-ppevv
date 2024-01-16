export type { IDataSource } from './data/IDataSource';
export { apiDataSource } from './data/sources/api';
export { mockedDataSource } from './data/sources/mocked';

export { generalPreferencesMock } from './data/mocks/generalPreferences.mock';
export { preferencesMock } from './data/mocks/preferences.mock';

export type { IGeneralPreference } from './types/IGeneralPreference';
export type { IShiftPreferences } from './types/IShiftPreferences';
export type { PreferencesType } from './types/PreferencesType';

export { generalPreferencesShema } from './types/IGeneralPreference';
export { shiftPreferencesSchema } from './types/IShiftPreferences';

export { useGeneralPreferences } from './hooks/useGeneralPreferences';
export { useShiftsPreferences } from './hooks/useShiftsPreferences';
export { useUpdateGeneralPreferences } from './hooks/useUpdateGeneralPreferences';
export { useUpdateShiftsPreferences } from './hooks/useUpdateShiftsPreferences';

export { PreferencesPage } from './components/PreferencesPage';
export { PreferencesReplacementPage } from './components/PreferencesReplacementPage';
