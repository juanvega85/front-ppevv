import { addTimes, removeSeconds } from '@ppe/common';
import { IShiftCalendarEvent } from '../types/IShiftCalendarEvent';
import { ITimeSlots, IShiftReports, getTimeSlotsHydrated } from '@ppe/scheduling';
import { isBefore } from 'date-fns';

export const buildEvents = (timeSlots?: ITimeSlots, shiftReports?: IShiftReports): IShiftCalendarEvent[] => {
  if (!timeSlots || !shiftReports) return [];

  const timeSlostHydrated = getTimeSlotsHydrated(timeSlots);

  return timeSlostHydrated.map((timeSlot) => {
    const shiftReport = shiftReports.shiftReports.find((item) => item.shift.id === timeSlot.shift.id && item.date === timeSlot.date);

    return {
      id: timeSlot.id,
      start: new Date(`${timeSlot.date}T${timeSlot.timeOfDay}`),
      end: new Date(`${timeSlot.date}T${addTimes(timeSlot.timeOfDay, timeSlot.duration)}`),
      title: removeSeconds(timeSlot.timeOfDay),

      attendance: shiftReport ? `${shiftReport.users.length}/${timeSlot.assigned.length}` : '',
      attendanceWarning: Boolean(shiftReport && shiftReport.users.length !== timeSlot.assigned.length),
      timeSlot,
      shiftReport: shiftReport ? { ...shiftReport, users: shiftReport.users } : undefined,
      prevToday: isBefore(new Date(timeSlot.date), new Date()),
    };
  });
};
