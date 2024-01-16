import { shiftsMock } from '../../data/mocks/shifts.mock';
import { IDataSource } from '../../data/IDataSource';
import { mockedDataSource as mockedSitesDataSource } from '@ppe/sites';

export const mockedDataSource: IDataSource = {
  ...mockedSitesDataSource,

  getShifts: (params) =>
    Promise.resolve({
      data: {
        ...shiftsMock.data,
        shifts: params ? shiftsMock.data.shifts.filter((s) => s.site.id === params.siteId && s.day === params?.dayOfTheWeek) : shiftsMock.data.shifts,
      },
    }),
  createShifts: () => Promise.resolve({ data: { shifts: [], _sites: {}, _profiles: {}, _teams: {} } }),
  updateShifts: (data) => Promise.resolve({ data: { shifts: data, _sites: {}, _profiles: {}, _teams: {} } }),
  deleteShift: () => Promise.resolve(),
};
