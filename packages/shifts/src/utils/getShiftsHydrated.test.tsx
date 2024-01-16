import { ISite } from '@ppe/sites';
import { shiftsMock } from '../data/mocks/shifts.mock';
import { getShiftsHydrated } from './getShiftsHydrated';

describe('getShiftsHydrated', () => {
  it('should return [] when no receive data', () => {
    const result = getShiftsHydrated();

    expect(result).toEqual([]);
  });

  it('should return formated profiles with data team', () => {
    const result = getShiftsHydrated(shiftsMock.data);

    expect((result[0].site as ISite).name).toBe('Costanera Center');
  });
});
