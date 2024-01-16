import { scheduleMock } from '../mocks/schedule.mock';
import { shiftReportsMock } from '../../data/mocks/shiftReports.mock';
import { timeSlotsMock } from '../mocks/timeslots.mock';
import { IDataSource } from '../../data/IDataSource';
import { mockedDataSource as mockedProfilesDataSource } from '@ppe/profiles';
import { mockedDataSource as mockedShiftsDataSource } from '@ppe/shifts';

export const mockedDataSource: IDataSource = {
  ...mockedProfilesDataSource,
  ...mockedShiftsDataSource,

  getSchedule: () => Promise.resolve(scheduleMock),
  createSchedule: () => Promise.resolve({ data: [] }),
  updateSchedule: () => Promise.resolve(),
  restoreScheduleException: () => Promise.resolve(),
  setScheduleException: () => Promise.resolve(),
  getScheduleOverlapping: () => Promise.resolve({ data: { count: 1 } }),

  getReports: () => Promise.resolve(shiftReportsMock),
  createReport: () => Promise.resolve({}),
  getUserReports: () => Promise.resolve(shiftReportsMock),

  getUserAssignments: () => Promise.resolve(timeSlotsMock),
  getAssignments: () => Promise.resolve(timeSlotsMock),
};
