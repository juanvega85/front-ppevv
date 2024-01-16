import { IGeneralPreference } from '../types/IGeneralPreference';
import { IShiftPreferences } from '../types/IShiftPreferences';
import { PreferencesType } from '../types/PreferencesType';
import { IDataSource as IShiftsDataSource } from '@ppe/shifts';

export interface IResponse<T> {
  data: T;
}

export interface IDataSource extends IShiftsDataSource {
  getShiftsPreferences: (userId: string, type: PreferencesType) => Promise<IResponse<IShiftPreferences>>;
  updateShiftsPreferences: (params: { userId: string; type: PreferencesType; data: string[] }) => Promise<IResponse<string[]>>;
  getGeneralPreferences: (userId: string) => Promise<IResponse<IGeneralPreference>>;
  updateGeneralPreferences: (params: { userId: string; values: IGeneralPreference }) => Promise<IResponse<IGeneralPreference>>;
}
