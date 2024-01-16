import { ICalendarEvent } from '@ppe/ui';
import { ITimeSlot, IShiftReport } from '@ppe/scheduling';

export interface IShiftCalendarEvent extends ICalendarEvent {
  attendance: string;
  attendanceWarning: boolean;
  timeSlot: ITimeSlot;
  shiftReport?: IShiftReport;
  prevToday: boolean;
}
