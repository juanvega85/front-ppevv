import { IShiftReport } from '../types/IShiftReport';
import { ISchedule } from '../types/ISchedule';
import { IShiftReports } from '../types/IShiftReports';
import { IDataSource as IProfilesDataSource } from '@ppe/profiles';
import { IDataSource as IShiftsDataSource } from '@ppe/shifts';
import { ITimeSlots } from '../types/ITimeSlots';
import { ISchedules } from '../types/ISchedules';

export interface IResponse<T> {
  data: T;
}

export interface IDataSource extends IProfilesDataSource, IShiftsDataSource {
  getSchedule: (scheduleId: string, shiftId: string) => Promise<IResponse<ISchedules>>;
  createSchedule: (params: { shiftId: string; data: Omit<ISchedule, 'id' | 'shift'>[] }) => Promise<unknown>;
  updateSchedule: (params: { shiftId: string; data: any }) => Promise<unknown>;
  restoreScheduleException: (params: { shiftId: string; timeSlotId: string }) => Promise<unknown>;

  setScheduleException: (params: { shiftId: string; data: any }) => Promise<unknown>;
  getScheduleOverlapping: (shiftId: string, params?: Record<string, string>) => Promise<IResponse<{ count: number }>>;

  createReport: (params: { shiftId: string; data: Omit<IShiftReport, 'id'>[] }) => Promise<unknown>;
  getReports: (siteId: string, startDate: string, endDate: string) => Promise<IResponse<IShiftReports>>;
  getUserReports: (userId: string, startDate: string, endDate: string) => Promise<IResponse<IShiftReports>>;

  getAssignments: (siteId: string, startDate: string, endDate: string) => Promise<IResponse<ITimeSlots>>;
  getUserAssignments: (userId: string, startDate: string, endDate: string) => Promise<IResponse<ITimeSlots>>;
}
