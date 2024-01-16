import { IShiftReports } from '../types/IShiftReports';
import { IShiftReport } from '../types/IShiftReport';

export const getShiftReportsHydrated = (data?: IShiftReports): IShiftReport[] => {
  if (!data) return [];
  return data.shiftReports
};
