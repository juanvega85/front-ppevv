import { fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { IStorage } from '../types/IStorage';
import { renderForTesting } from '../utils/renderForTesting';
import { StorageList } from './StorageList';

const storage: IStorage[] = [
  {
    address: {
      description: 'Inmobiliaria Lolco Limitada - Lolco, Las Condes, Chile',
      formattedAddress: 'Lolco 7640, Las Condes, Región Metropolitana, Chile',
      locality: 'Las Condes',
      country: 'Chile',
      coordinates: {
        lat: '-33.426447',
        lng: '-70.5535254',
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
        unit: '',
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
];

describe('StorageList', () => {
  it('should render data storage', () => {
    renderForTesting(<StorageList data={storage} />);

    screen.getByText(/address/i);
    screen.getByText(/contact/i);
    screen.getByText(/unit/i);
    screen.getByText(/notes/i);

    screen.getByText('Lolco 7640, Las Condes, Región Metropolitana, Chile');
    screen.getByText('1234');
    screen.getByText('Juan Medina');
    screen.getByText('my note');
  });

  it('should call onRemoveItem function', () => {
    const onRemoveItem = vi.fn();
    renderForTesting(<StorageList data={storage} onRemoveItem={onRemoveItem} />);

    fireEvent.click(screen.getByTestId('CloseIcon'));

    expect(onRemoveItem).toBeCalledTimes(1);
    expect(onRemoveItem).toBeCalledWith(0);
  });
});
