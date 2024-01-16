import { networkingInit } from '@ppe/networking';
import { ISchedule } from '../../types/ISchedule';
import { IDataSource } from '../IDataSource';
import { apiDataSource as apiProfilesSourceTeams } from '@ppe/profiles';
import { IShiftReport } from '../../types/IShiftReport';
import { apiDataSource as apiShiftsSourceTeams } from '@ppe/shifts';

export const apiDataSource = (url: string): IDataSource => {
  const network = networkingInit(url);

  return {
    ...apiProfilesSourceTeams(url),
    ...apiShiftsSourceTeams(url),

    getSchedule: (scheduleId, shiftId) => network.get(`/shiftscheduling/shifts/${shiftId}/schedule/${scheduleId}`),
    createSchedule: (params: { shiftId: string; data: Omit<ISchedule, 'id' | 'shift'>[] }) =>
      network.post(`/shiftscheduling/shifts/${params.shiftId}/schedule`, params.data),
    getScheduleOverlapping: (shiftId: string, params) => network.get(`/shiftscheduling/shifts/${shiftId}/schedule`, { params }),
    updateSchedule: (params: { shiftId: string; data: any }) => network.put(`/shiftscheduling/shifts/${params.shiftId}/schedule`, params.data),

    restoreScheduleException: (params: { shiftId: string; timeSlotId: string }) =>
      network.post(`/shiftscheduling/shifts/${params.shiftId}/timeslots/${params.timeSlotId}/reset`),
    setScheduleException: (params: { shiftId: string; data: any }) => network.put(`/shiftscheduling/shifts/${params.shiftId}/timeslots`, params.data),

    createReport: (params: { shiftId: string; data: Omit<IShiftReport, 'id'>[] }) =>
      network.post(`/shiftscheduling/shifts/${params.shiftId}/reports`, params.data),
    getReports: (siteId: string, startDate: string, endDate: string) =>
      network.get(`/sites/${siteId}/shiftscheduling/calendar/reports`, { params: { startDate, endDate } }),
    getUserReports: (userId: string, startDate: string, endDate: string) =>
      network.get(`/profiles/${userId}/shiftscheduling/calendar/reports`, { params: { startDate, endDate } }),

    getAssignments: (siteId: string, startDate: string, endDate: string) =>
      network.get(`/sites/${siteId}/shiftscheduling/calendar/timeslots`, { params: { startDate, endDate } }),
    getUserAssignments: (userId: string, startDate: string, endDate: string) =>
      network.get(`/profiles/${userId}/shiftscheduling/calendar/timeslots`, { params: { startDate, endDate } }),
  };
};
