import { timeSlotsMock } from '../data/mocks/timeslots.mock';
import { getTimeSlotsHydrated } from './getTimeSlotsHydrated';

const data = { ...timeSlotsMock.data, timeslots: [timeSlotsMock.data.timeslots[0]] };

describe('getTimeSlotsHydrated', () => {
  it('should return [] when not passing data', () => {
    const timeSlotsHydrated = getTimeSlotsHydrated();

    expect(timeSlotsHydrated).toEqual([]);
  });

  it('should return timeslots hydrated', () => {
    const timeSlotsHydrated = getTimeSlotsHydrated(data);

    expect(timeSlotsHydrated[0].schedule).toEqual({
      shift: { id: '62ae34d43e83340a92863709' },
      assigned: [{ id: '62b0a4e43e83340a9286372d' }, { id: '62abdd8e89d5bc0ffc129116' }, { id: '62abfc6a89d5bc0ffc129124' }],
      notes: [],
      periodEndDay: '2022-10-31',
      periodStartDay: '2022-10-01',
      id: '6345a7599242c30fa1782c6f',
    });

    expect(timeSlotsHydrated[0].shift).toEqual({
      site: { id: '62ae330f3e83340a928636e7' },
      active: true,
      startTime: '12:30:00',
      duration: '02:30:00',
      day: '0Monday',
      id: '62ae34d43e83340a92863709',
    });

    expect(timeSlotsHydrated[0].assigned).toEqual([
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
        landlinePhone: '56212345678',
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
      {
        address: {
          coordinates: { lat: '-33.454156', lng: '-70.61763619999999' },
          country: 'Chile',
          region: 'Región Metropolitana',
          city: 'Santiago',
          locality: 'Ñuñoa',
          unit: '508',
          route: 'José Manuel Infante',
          streetNumber: '2520',
          formattedAddress: 'José Manuel Infante 2520, Ñuñoa, Región Metropolitana, Chile',
          description: 'José Manuel Infante 2520, Ñuñoa, Chile',
        },
        team: { name: 'Providencia', id: '62abfc1189d5bc0ffc129123' },
        languages: ['Spanish'],
        maritalStatus: 'Married',
        gender: 'Male',
        appointedCapacity: 'Elder',
        serviceCapacity: 'Publisher',
        birthDate: '1979-10-31',
        mobilePhone: '56991288096',
        landlinePhone: '',
        baptismDate: '1993-12-12',
        lastName: 'Müller',
        firstName: 'Enrique',
        email: 'muller.enrique@gmail.com',
        id: '62abfc6a89d5bc0ffc129124',
      },
    ]);
  });
});
