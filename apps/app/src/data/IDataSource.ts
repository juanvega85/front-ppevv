import { IDataSource as ITeamsDataSource } from '@ppe/teams';
import { IDataSource as IProfilesDataSource } from '@ppe/profiles';
import { IDataSource as ISitesDataSource } from '@ppe/sites';
import { IDataSource as IShiftsDataSource } from '@ppe/shifts';
import { IDataSource as IPreferencesDataSource } from '@ppe/preferences';
import { IDataSource as ISchedulingDataSource } from '@ppe/scheduling';

export interface IDataSource
  extends ITeamsDataSource,
    IProfilesDataSource,
    ISitesDataSource,
    IShiftsDataSource,
    IPreferencesDataSource,
    ISchedulingDataSource {}
