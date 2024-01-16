import { ProfileForm } from './ProfileForm';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { mockedDataSource } from '../data/sources/mocked';
import userEvent from '@testing-library/user-event';
import { IUser, mockedDataSource as mockedCommon } from '@ppe/common';
import { vi } from 'vitest';
import { renderForTesting } from '../utils/renderForTesting';
import { getMockGooogleMaps } from '@ppe/ui';
import { IProfile } from '../types/IProfile';

beforeAll(() => {
  global.google = getMockGooogleMaps();
});

const newProfile: Omit<IProfile, 'id'> = {
  email: 'email@email.com',
  firstName: 'John',
  lastName: 'Doe',
  gender: 'Male',
  maritalStatus: 'Single',
  birthDate: '2022-11-16',
  team: {
    id: '62abe93989d5bc0ffc12911a',
    name: 'Andes',
  },
  baptismDate: '2022-11-24',
  serviceCapacity: 'Publisher',
  appointedCapacity: 'Elder',
  languages: ['Spanish', 'English', 'Chinese'],
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
  },
  landlinePhone: '',
  mobilePhone: '56998798789',
};

describe('ProfileForm', () => {
  it('should render ok', async () => {
    renderForTesting(<ProfileForm dataSource={{ ...mockedDataSource, ...mockedCommon }} />);

    await waitFor(() => expect(screen.getByLabelText(/team/i).getAttribute('aria-disabled')).toBeFalsy());

    screen.getByText(/personal information/i);
    screen.getByLabelText(/email/i);
    screen.getByLabelText('Name');
    screen.getByLabelText(/last name/i);
    screen.getByLabelText(/gender/i);
    screen.getByLabelText(/marital status/i);
    screen.getByLabelText(/languages/i);
    screen.getByLabelText(/address/i);
    screen.getByLabelText(/unit/i);
    screen.getByLabelText(/birthdate/i);
    screen.getByLabelText(/landline phone/i);
    screen.getByLabelText(/mobile phone/i);

    screen.getByText(/theocratic information/i);
    screen.getByLabelText(/team/i);
    screen.getByLabelText(/baptism date/i);
    screen.getByLabelText(/service capacity/i);
    screen.getByLabelText(/appointed capacity/i);

    screen.getByText(/clear/i);
    screen.getByText(/create/i);
  });

  it('should show error messages for required fields', async () => {
    renderForTesting(<ProfileForm dataSource={{ ...mockedDataSource, ...mockedCommon }} />);

    userEvent.click(screen.getByText(/create/i));
    await waitFor(() => expect(screen.getAllByText(/required/i).length).toBe(13));
  });

  it('should validate existing email. No exists, so it is ok', async () => {
    const getUserByEmail = vi.fn(() => Promise.resolve({ data: [] }));
    renderForTesting(<ProfileForm dataSource={{ ...mockedDataSource, ...mockedCommon, getUserByEmail }} />);

    userEvent.type(screen.getByLabelText(/email/i), 'email@email.com');
    userEvent.click(screen.getByText(/create/i));
    await waitFor(() => expect(screen.getAllByText(/required/i).length).toBe(12));
  });

  it('should validate existing email. Already exists, so it shows message', async () => {
    const profile: IUser = {
      id: '1234567',
      firstName: '',
      lastName: '',
      email: 'email@email.com',
      active: true,
      tenantIds: [],
    };
    const getUserByEmail = vi.fn(() => Promise.resolve({ data: [profile] }));
    renderForTesting(<ProfileForm dataSource={{ ...mockedDataSource, ...mockedCommon, getUserByEmail }} />);

    userEvent.type(screen.getByLabelText(/email/i), 'email@email.com');
    userEvent.click(screen.getByText(/create/i));
    await waitFor(() => expect(screen.getAllByText(/required/i).length).toBe(12));
    screen.getByText(/email already exist/i);
  });

  it('should render Unit field disabled', async () => {
    await act(() => {
      renderForTesting(<ProfileForm dataSource={{ ...mockedDataSource, ...mockedCommon }} />);
    });

    expect(screen.getByLabelText(/unit/i)).toHaveProperty('disabled', true);
  });

  it.skip('should send form data and call create and onFinish functions', async () => {
    const onFinish = vi.fn();
    const createProfiles = vi.fn(() => Promise.resolve({ data: { profiles: [{ ...newProfile, id: '1234' }], _teams: {} } }));

    renderForTesting(<ProfileForm dataSource={{ ...mockedDataSource, ...mockedCommon, createProfiles }} onFinish={onFinish} />);

    await waitFor(() => expect(screen.getByLabelText(/team/i).getAttribute('aria-disabled')).toBeFalsy());

    userEvent.type(screen.getByLabelText(/email/i), 'email@email.com');

    userEvent.type(screen.getByLabelText('Name'), 'John');
    userEvent.type(screen.getByLabelText(/last name/i), 'Doe');

    userEvent.click(screen.getByLabelText(/gender/i));
    userEvent.click(screen.getByText('Male'));

    userEvent.click(screen.getByLabelText(/marital status/i));
    userEvent.click(screen.getByText('Single'));

    userEvent.click(screen.getByLabelText(/languages/i));
    userEvent.click(screen.getByText('Spanish'));
    userEvent.click(screen.getByText('English'));
    userEvent.click(screen.getByText('Chinese'));

    userEvent.click(screen.getByLabelText(/team/i));
    userEvent.click(screen.getByText('Andes'));

    userEvent.click(screen.getByLabelText(/service capacity/i));
    userEvent.click(screen.getByText('Publisher'));

    userEvent.click(screen.getByLabelText(/appointed capacity/i));
    userEvent.click(screen.getByText('Elder'));

    fireEvent.change(screen.getByLabelText(/baptism date/i), { target: { value: '2022-11-24' } });
    fireEvent.change(screen.getByLabelText(/birthdate/i), { target: { value: '2022-11-16' } });

    fireEvent.change(screen.getByLabelText(/Mobile phone/i), { target: { value: '56 9 9879 8789' } });

    fireEvent.change(screen.getByLabelText(/address/i), { target: { value: 'lolco' } });
    await waitFor(() => screen.getByText(/inmobiliaria lolco limitada/i));
    userEvent.click(screen.getByText(/inmobiliaria lolco limitada/i));

    // el primer click en 'Create' es para cerrar el select de idiomas, si no se encierra en act genera warning
    await act(async () => userEvent.click(screen.getByText(/create/i)));
    userEvent.click(screen.getByText(/create/i));

    await waitFor(() => screen.getAllByText(/Created successfully/i));

    expect(createProfiles).toBeCalledTimes(1);
    expect(createProfiles).toBeCalledWith([newProfile]);

    expect(onFinish).toBeCalledTimes(1);
    expect(onFinish).toBeCalledWith({ ...newProfile, id: '1234' });
  }, 20000);

  it('should send form data and call update and onFinish functions', async () => {
    const onFinish = vi.fn();
    const updateProfiles = vi.fn(() => Promise.resolve({ data: { profiles: [{ ...newProfile, id: '1234' }], _teams: {} } }));

    renderForTesting(
      <ProfileForm dataSource={{ ...mockedDataSource, ...mockedCommon, updateProfiles }} onFinish={onFinish} data={{ ...newProfile, id: '1234' }} />
    );

    await waitFor(() => expect(screen.getByLabelText(/team/i).getAttribute('aria-disabled')).toBeFalsy());

    await act(async () => userEvent.click(screen.getByText(/update/i)));

    await waitFor(() => screen.getAllByText(/Updated successfully/i));

    expect(updateProfiles).toBeCalledTimes(1);
    expect(updateProfiles).toBeCalledWith([{ ...newProfile, id: '1234' }]);

    expect(onFinish).toBeCalledTimes(1);
  });
});
