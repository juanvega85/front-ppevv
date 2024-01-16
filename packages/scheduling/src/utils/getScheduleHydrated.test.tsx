import { scheduleMock } from '../data/mocks/schedule.mock';
import { getScheduleHydrated } from './getScheduleHydrated';

describe('getScheduleHydrated', () => {
  it('should return schedule hydrated', () => {
    const schedulesHydrated = getScheduleHydrated(scheduleMock.data);

    expect(schedulesHydrated.shift).toEqual({
      site: { id: '631a2f24d227da0f33eb1ea1' },
      active: true,
      duration: '08:00:00',
      startTime: '08:00:00',
      day: '0Monday',
      id: '62ae34d43e83340a92863709',
    });

    expect(schedulesHydrated.assigned).toEqual([
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
      {
        address: {
          coordinates: { lat: '-33.4646281', lng: '-70.6106762' },
          country: 'Chile',
          region: 'Región Metropolitana',
          city: 'Santiago',
          locality: 'Ñuñoa',
          unit: '',
          route: 'Avenida Grecia',
          streetNumber: '2001',
          formattedAddress: 'via ocho 1146. dpto 4. ÑuÑoa',
          description: 'Estadio Nacional, Ñuñoa, Chile',
        },
        team: { name: 'Villa Olimpica', id: '62acbceb3e83340a928636cb' },
        languages: ['Spanish'],
        maritalStatus: 'Married',
        gender: 'Male',
        appointedCapacity: 'Elder',
        serviceCapacity: 'RegularPioneer',
        birthDate: '1999-01-01',
        mobilePhone: '',
        landlinePhone: '',
        baptismDate: '1999-01-01',
        lastName: 'Gaete',
        firstName: 'Cristian',
        email: 'cristian.gaeter@gmail.com',
        id: '62acc3363e83340a928636cd',
      },
    ]);
  });
});
