import { screen } from '@testing-library/react';
import { renderForTesting } from '../utils/renderForTesting';
import { SiteMap } from './SiteMap';
import { vi } from 'vitest';
import '@react-google-maps/api';
import { getProfilesHydrated, profilesMock } from '@ppe/profiles';
import { ITeam } from '@ppe/teams';

const coordinates = {
  lat: '-33.426447',
  lng: '-70.5535254',
};

const storage = [
  {
    address: {
      description: 'Inmobiliaria Lolco Limitada - Lolco, Las Condes, Chile',
      formattedAddress: 'Lolco 7640, Las Condes, Región Metropolitana, Chile',
      locality: 'Las Condes',
      country: 'Chile',
      coordinates: {
        lat: '-34.426447',
        lng: '-71.5535254',
      },
      city: 'Santiago',
      route: 'Lolco',
      region: 'Región Metropolitana',
      unit: '1234',
      streetNumber: '7640',
    },
    responsible: {
      address: {
        coordinates: {
          lat: '-33.4488897',
          lng: '-70.6692655',
        },
        country: 'Chile',
        region: 'Región Metropolitana',
        city: 'Santiago',
        locality: 'Santiago de Chile',
        formattedAddress: 'Santiago de Chile, Región Metropolitana, Chile',
        description: 'Santiago, Chile',
      },
      team: {
        id: '62abdd3d89d5bc0ffc129115',
        name: 'Inglesa Viña del Mar',
      },
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
    notes: 'my note',
  },
  {
    address: {
      description: 'Inmobiliaria Lolco Limitada - Lolco, Las Condes, Chile 2',
      formattedAddress: 'Lolco 7640, Las Condes, Región Metropolitana, Chile 2',
      locality: 'Las Condes 2',
      country: 'Chile 2',
      coordinates: {
        lat: '-35.426447',
        lng: '-72.5535254',
      },
      city: 'Santiago 2',
      route: 'Lolco 2',
      region: 'Región Metropolitana 2',
      unit: '12345',
      streetNumber: '76401',
    },
    responsible: {
      address: {
        description: 'Lolco 7640, Las Condes, Santiago',
        formattedAddress: 'Lolco 7640, Las Condes, Santiago',
        streetNumber: '7640',
        route: 'Lolco',
        unit: '1013',
        locality: 'Las Condes',
        city: 'Santiago',
        country: 'Chile',
        coordinates: {
          lng: '-70.553429',
          lat: '-33.426528',
        },
      },
      team: { id: '62b1d371036b920314d4b7d7' },
      languages: ['Spanish'],
      maritalStatus: 'Married',
      gender: 'Female',
      appointedCapacity: 'None',
      serviceCapacity: 'RegularPioneer',
      birthDate: '1983-01-31',
      mobilePhone: '56991328134',
      landlinePhone: '',
      baptismDate: '2007-11-10',
      lastName: 'venegas campano',
      firstName: 'claudia pamela',
      email: 'cvenegascampano@gmail.com',
      id: '62b1d371036b920314d4b7d8',
    },
    notes: 'my note 2',
  },
];

const profiles = getProfilesHydrated(profilesMock.data).slice(0, 2);

vi.mock('@react-google-maps/api', () => ({
  useLoadScript: () => ({
    isLoaded: true,
    loadError: null,
  }),
  GoogleMap: () => {
    return (
      <>
        <div>{`${coordinates.lat}, ${coordinates.lng}`}</div>

        {storage.map((item, index) => (
          <div key={index}>
            <span>{`${item.address.coordinates.lat}, ${item.address.coordinates.lng}`}</span>
            <span>{`${item.responsible.firstName} ${item.responsible.lastName}`}</span>
            <span>{`${item.address.formattedAddress}${item.address.unit ? `. Unit ${item.address.unit}` : null}`}</span>
            <span>Notes: {`${item.notes}`}</span>
          </div>
        ))}

        {profiles.map((item, index) => (
          <div key={index}>
            <span>{`${item.address.coordinates.lat}, ${item.address.coordinates.lng}`}</span>
            <span>{`${item.firstName} ${item.lastName}`}</span>
            <span>{(item.team as ITeam).name}</span>
            <span>{`${item.address.formattedAddress}${item.address.unit ? `. Unit ${item.address.unit}` : null}`}</span>
          </div>
        ))}
      </>
    );
  },
  Marker: () => {},
}));

describe('SiteMap', () => {
  it('should render map with default position', () => {
    renderForTesting(<SiteMap position={coordinates} />);

    screen.getByText(`${coordinates.lat}, ${coordinates.lng}`);
  });

  it('should render map with data storage positions', () => {
    renderForTesting(<SiteMap position={coordinates} storage={storage} />);

    for (const item of storage) {
      screen.getByText(`${item.address.coordinates.lat}, ${item.address.coordinates.lng}`);
      screen.getByText(`${item.responsible.firstName} ${item.responsible.lastName}`);
      screen.getByText(`${item.address.formattedAddress}${item.address.unit ? `. Unit ${item.address.unit}` : null}`);
      screen.getByText(`Notes: my note`);
    }
  });

  it('should render map with data profiles positions', () => {
    renderForTesting(<SiteMap position={coordinates} profiles={profiles} />);

    for (const item of profiles) {
      screen.getByText(`${item.address.coordinates.lat}, ${item.address.coordinates.lng}`);
      screen.getByText(`${item.firstName} ${item.lastName}`);
      screen.getByText(`${(item.team as ITeam).name}`);
      screen.getByText(`${item.address.formattedAddress}${item.address.unit ? `. Unit ${item.address.unit}` : null}`);
    }
  });
});
