import { shiftReportsMock } from '../data/mocks/shiftReports.mock';
import { getShiftReportsHydrated } from './getShiftReportsHydrated';

describe('getShiftReportsHydrated', () => {
  it('should return [] when not passing data', () => {
    const reportsHydrated = getShiftReportsHydrated();

    expect(reportsHydrated).toEqual([]);
  });

  it('should return shifts reports hydrated', () => {
    const reportsHydrated = getShiftReportsHydrated(shiftReportsMock.data);

    expect(reportsHydrated[0].shift).toEqual({
      site: { id: '62ae330f3e83340a928636e7' },
      active: true,
      duration: '02:30:00',
      startTime: '12:30:00',
      day: '0Monday',
      id: '62ae34d43e83340a92863709',
    });

    expect(reportsHydrated[0].users).toEqual([
      {
        address: {
          coordinates: { lat: '-33.4488897', lng: '-70.6692655' },
          country: 'Chile',
          region: 'Región Metropolitana',
          city: 'Santiago',
          locality: 'Santiago de Chile',
          unit: '',
          formattedAddress: 'Santiago de Chile, Región Metropolitana, Chile',
          description: 'Santiago, Chile',
        },
        team: { name: 'Inglesa Viña del Mar', id: '62abdd3d89d5bc0ffc129115' },
        languages: ['Spanish'],
        maritalStatus: 'Married',
        gender: 'Male',
        appointedCapacity: 'Elder',
        serviceCapacity: 'Publisher',
        birthDate: '1989-01-01',
        mobilePhone: '56912341234',
        landlinePhone: '',
        baptismDate: '2010-01-01',
        lastName: 'Medina',
        firstName: 'Juan',
        email: 'juanruben@gmail.com',
        id: '62b0a4e43e83340a9286372d',
      },
      {
        address: {
          coordinates: { lat: '-32.9750338', lng: '-71.539247' },
          country: 'Chile',
          region: 'Valparaíso',
          city: 'Valparaiso',
          locality: 'Viña del Mar',
          unit: '302',
          route: 'Los Sargazos',
          streetNumber: '376',
          formattedAddress: 'Los Sargazos 376, Viña del Mar, Valparaíso, Chile',
          description: 'Los Sargazos 376, Viña del Mar, Chile',
        },
        team: { name: 'Inglesa Viña del Mar', id: '62abdd3d89d5bc0ffc129115' },
        languages: ['Spanish', 'English', 'Arabic'],
        maritalStatus: 'Married',
        gender: 'Male',
        appointedCapacity: 'Elder',
        serviceCapacity: 'RegularPioneer',
        birthDate: '1972-04-13',
        mobilePhone: '',
        landlinePhone: '',
        baptismDate: '1987-12-19',
        lastName: 'Zoulin',
        firstName: 'Paul',
        email: 'toochevere@gmail.com',
        id: '62abdd8e89d5bc0ffc129116',
      },
    ]);
  });
});
