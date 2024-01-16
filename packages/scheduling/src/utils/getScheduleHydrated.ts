import { ISchedules } from '../types/ISchedules';
import { ISchedule } from '../types/ISchedule';

export const getScheduleHydrated = (data: ISchedules): ISchedule => {
  const schedule = data.schedules[0];
  // schedule.shift = data._shifts[schedule.shift.id];
  // schedule.assigned = schedule.assigned.map((profile) => ({
  //   ...data._profiles[profile.id],
  //   team: data._teams[data._profiles[profile.id].team.id],
  // }));
  return schedule;
};
