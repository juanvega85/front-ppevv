import { ITimeSlot } from '../types/ITimeSlot';
import { ITimeSlots } from '../types/ITimeSlots';

export const getTimeSlotsHydrated = (data?: ITimeSlots): ITimeSlot[] => {
  if (!data) return [];
  return data.timeslots;
};
