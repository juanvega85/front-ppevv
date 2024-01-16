import { IShift } from '../types/IShift';
import { IShifts } from '../types/IShifts';

export const getShiftsHydrated = (data?: IShifts): IShift[] => {
  if (!data) return [];
  return data.shifts;
  // return data.shifts.map((item) => ({
  //   ...item,
  //   site: data._sites[item.site.id],
  // }));
};
