import { IResponse } from '@ppe/networking';
import { IProfiles } from '../../types/IProfiles';

export const profilesMock: IResponse<IProfiles> = {
  data: {
    profiles: [
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
        team: { id: '62abdd3d89d5bc0ffc129115', name : 'Nonato' },
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
        id: "1"
      },
      {
        address: {
          description: 'Lolco 7640, Las Condes, Santiago',
          formattedAddress: 'Lolco 7640, Las Condes, Santiago',
          streetNumber: '7640',
          route: 'Lolco',
          unit: '1375',
          locality: 'Las Condes',
          city: 'Santiago',
          country: 'Chile',
          coordinates: {
            lng: '-70.553429',
            lat: '-33.426528',
          },
        },
        team: { id: '62b1d38d036b920314d4b7f2' , name : 'Nonato'},
        languages: ['Spanish'],
        maritalStatus: 'Single',
        gender: 'Female',
        appointedCapacity: 'None',
        serviceCapacity: 'Publisher',
        birthDate: '1985-04-17',
        mobilePhone: '56979792297',
        landlinePhone: '56979792297',
        baptismDate: '2000-06-24',
        lastName: 'Ibañez Alvarez',
        firstName: 'Maria De Los Angeles',
        email: 'gatoberilio@gmail.com',
        id: "2"
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
        team: { id: '62abfc1189d5bc0ffc129123', name : 'Nonato' },
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
        id: "3"
      }    
    ],
  
  },
};
