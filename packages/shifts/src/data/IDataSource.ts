import { IShift } from '../types/IShift';
import { IDataSource as ISitesDataSource } from '@ppe/sites';
import { IShifts } from '../types/IShifts';
import { IResponse } from '@ppe/networking';

export interface IDataSource extends ISitesDataSource {
  getShifts: (params?: Record<string, string>) => Promise<IResponse<IShifts>>;
  createShifts: (data: Omit<IShift, 'id'>[]) => Promise<IResponse<IShifts>>;
  updateShifts: (data: IShift[]) => Promise<IResponse<IShifts>>;
  deleteShift: (id: string) => Promise<unknown>;
}
