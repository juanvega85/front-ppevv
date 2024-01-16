import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { profilesMock } from '@ppe/profiles';
import { getMockGooogleMaps } from '@ppe/ui';
import { vi } from 'vitest';
import { IStorage } from '../types/IStorage';
import { renderForTesting } from '../utils/renderForTesting';
import { StorageForm } from './StorageForm';

const { profiles } = profilesMock.data;

const storage: IStorage = {
  responsible: {
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
    team: { id: '62abdd3d89d5bc0ffc129115' },
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
    streetNumber: '7640',
    unit: '1234',
  },
  notes: 'my note',
};

beforeAll(() => {
  global.google = getMockGooogleMaps();
});

describe('StorageForm', () => {
  it('should render form with button add custodian and unit input disabled', () => {
    renderForTesting(<StorageForm />);

    screen.getByLabelText(/address/i);
    screen.getByLabelText(/contact/i);
    screen.getByLabelText(/notes/i);
    expect(screen.getByLabelText(/unit/i)).toHaveProperty('disabled', true);
    expect(screen.getByRole('button', { name: /Add equipment custodian/i })).toHaveProperty('disabled', true);
  });

  it('should show button add custodian disabled when there is an address but no responsible contact', async () => {
    renderForTesting(<StorageForm />);
    fireEvent.change(screen.getByLabelText(/address/i), { target: { value: 'lolco' } });

    await waitFor(() => screen.getByText(/inmobiliaria lolco limitada/i));
    userEvent.click(screen.getByText(/inmobiliaria lolco limitada/i));

    await act(() => expect(screen.getByRole('button', { name: /Add equipment custodian/i })).toHaveProperty('disabled', true));
  });

  it('should add new custodian and call onFinish function and clear the form after adding', async () => {
    const onFinish = vi.fn();
    renderForTesting(<StorageForm profiles={profiles} onFinish={onFinish} />);

    fireEvent.change(screen.getByLabelText(/address/i), { target: { value: 'lolco' } });
    await waitFor(() => screen.getByText(/inmobiliaria lolco limitada/i));
    userEvent.click(screen.getByText(/inmobiliaria lolco limitada/i));

    await waitFor(() => expect(screen.getByLabelText(/unit/i)).toHaveProperty('disabled', false));

    userEvent.type(screen.getByLabelText(/unit/i), '1234');

    userEvent.click(screen.getByLabelText(/contact/i));
    userEvent.click(screen.getByText(/juan medina/i));

    await waitFor(() => expect(screen.queryByText('Cesar Quino Quevedo')).toBeNull());
    userEvent.type(screen.getByLabelText(/notes/i), 'my note');

    await waitFor(() => expect(screen.getByText(/Add equipment custodian/i)).toHaveProperty('disabled', false));
    userEvent.click(screen.getByText(/Add equipment custodian/i));

    expect(onFinish).toBeCalledTimes(1);
    expect(onFinish).toBeCalledWith(storage);

    expect(screen.getByLabelText(/address/i).getAttribute('value')).toBe('');
    expect(screen.getByLabelText(/unit/i).getAttribute('value')).toBe('');
    expect(screen.getByLabelText(/notes/i).getAttribute('value')).toBe('');
    expect(screen.queryByText(/juan medina/i)).toBeNull();

    expect(screen.getByLabelText(/unit/i)).toHaveProperty('disabled', true);
    expect(screen.getByRole('button', { name: /Add equipment custodian/i })).toHaveProperty('disabled', true);
  });
});
