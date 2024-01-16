import { getMockGooogleMaps } from '@ppe/ui';
import { renderForTesting } from '../utils/renderForTesting';
import { SiteForm } from './SiteForm';
import { mockedDataSource } from '../data/sources/mocked';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { ISite } from '../types/ISite';
import { sitesMock } from '../data/mocks/sites.mock';
import { IProfile } from '@ppe/profiles';
import { IStorage } from '../types/IStorage';

beforeAll(() => {
  global.google = getMockGooogleMaps();
});

const site: Omit<ISite, 'id'> = {
  name: 'site name',
  description: 'site description',
  coordinates: {
    lat: '-33.426447',
    lng: '-70.5535254',
  },
  primaryResponsible: {
    address: {
      coordinates: {
        lat: '-32.9750338',
        lng: '-71.539247',
      },
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
    team: {
      id: '62abdd3d89d5bc0ffc129115',
      name: 'Inglesa Viña del Mar',
    },
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
  secondaryResponsible: [
    {
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
      team: {
        id: '62b3642fb798541076913ce4',
        name: 'Reñaca',
      },
      languages: ['English', 'Spanish'],
      maritalStatus: 'Married',
      gender: 'Female',
      appointedCapacity: 'None',
      serviceCapacity: 'RegularPioneer',
      birthDate: '1981-09-20',
      mobilePhone: '56949115345',
      landlinePhone: '',
      baptismDate: '2013-03-09',
      lastName: 'Rojas Vergara',
      firstName: 'Alejandra Paz',
      email: 'alexapaz.rojas@gmail.com',
      id: '62b1d74c036b920314d4b821',
    },
    {
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
      team: {
        id: '62b1d787036b920314d4b878',
        name: 'Paul Harris',
      },
      languages: ['Spanish'],
      maritalStatus: 'Single',
      gender: 'Female',
      appointedCapacity: 'None',
      serviceCapacity: 'Publisher',
      birthDate: '1980-02-12',
      mobilePhone: '56998118612',
      landlinePhone: '',
      baptismDate: '1992-12-26',
      lastName: 'Bravo Jeria',
      firstName: 'Alexia Francisca',
      email: 'eupancha@gmail.com',
      id: '62b1d788036b920314d4b879',
    },
    {
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
      team: {
        id: '62acbceb3e83340a928636cb',
        name: 'Villa Olimpica',
      },
      languages: ['Spanish'],
      maritalStatus: 'Single',
      gender: 'Male',
      appointedCapacity: 'MinisterialServant',
      serviceCapacity: 'RegularPioneer',
      birthDate: '1964-08-08',
      mobilePhone: '56982397233',
      landlinePhone: '',
      baptismDate: '1994-06-14',
      lastName: 'Salinas Chepillan',
      firstName: 'Alfonso Jesus',
      email: 'jesus.salinas2@gmail.com',
      id: '62b1e67b036b920314d4b8e1',
    },
  ],
  storage: [
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
  ],
  active: false,
};

describe('SiteForm', () => {
  it('should render inputs form on general information tab by default', async () => {
    await act(() => {
      renderForTesting(<SiteForm dataSource={mockedDataSource} />);
    });

    screen.getByText(/General information/i);
    expect(screen.getByText(/General information/i).getAttribute('aria-selected')).toBe('true');
    screen.getByText(/managers/i);
    expect(screen.getByText(/managers/i).getAttribute('aria-selected')).toBe('false');
    screen.getByText(/storage/i);
    expect(screen.getByText(/storage/i).getAttribute('aria-selected')).toBe('false');
    screen.getByText(/create/i);

    screen.getByLabelText(/Name/i);
    screen.getByLabelText(/Description/i);
    screen.getByRole('checkbox', { name: /disabled/i });
    expect(screen.getByRole('checkbox')).toHaveProperty('checked', false);
    screen.getByLabelText(/address site/i);
    screen.getByText(/Enter an approximate address and then select the point in map/i);
  });

  it('should render inputs form on managers tab', async () => {
    await act(() => {
      renderForTesting(<SiteForm dataSource={mockedDataSource} />);
    });

    userEvent.click(screen.getByText(/managers/i));
    expect(screen.getByText(/General information/i).getAttribute('aria-selected')).toBe('false');
    expect(screen.getByText(/managers/i).getAttribute('aria-selected')).toBe('true');
    expect(screen.getByText(/storage/i).getAttribute('aria-selected')).toBe('false');

    screen.getByLabelText(/Overseer/i);
    screen.getByLabelText(/Helpers/i);
  });

  it('should render inputs form on storage tab with unit disabled because input address is empty', async () => {
    await act(() => {
      renderForTesting(<SiteForm dataSource={mockedDataSource} />);
    });

    userEvent.click(screen.getByText(/storage/i));
    expect(screen.getByText(/General information/i).getAttribute('aria-selected')).toBe('false');
    expect(screen.getByText(/managers/i).getAttribute('aria-selected')).toBe('false');
    expect(screen.getByText(/storage/i).getAttribute('aria-selected')).toBe('true');

    screen.getByLabelText(/Address/i);
    expect(screen.getByLabelText(/Unit/i)).toHaveProperty('disabled', true);
    screen.getByLabelText(/Contact/i);
    screen.getByLabelText(/Notes/i);
    screen.getByText(/Add equipment custodian/i);
  });

  it('should not show storage list', async () => {
    await act(() => {
      renderForTesting(<SiteForm dataSource={mockedDataSource} />);
    });

    expect(screen.queryByTestId('CloseIcon')).toBeNull();
  });

  it('should show error message when inputs form not be ok', async () => {
    await act(() => {
      renderForTesting(<SiteForm dataSource={mockedDataSource} />);
    });

    userEvent.click(screen.getByText(/create/i));

    expect(screen.getByText(/required field/i));
    expect(screen.getAllByText(/required field/i).length).toBe(1);
  });

  it.skip('should call create and onFinish functions and send form when inputs are be ok', async () => {
    const createSites = vi.fn(() => Promise.resolve(sitesMock));
    const onFinish = vi.fn();
    await act(() => {
      renderForTesting(<SiteForm dataSource={{ ...mockedDataSource, createSites }} onFinish={onFinish} />);
    });

    userEvent.type(screen.getByLabelText(/name/i), 'site name');
    userEvent.type(screen.getByLabelText(/description/i), 'site description');
    fireEvent.change(screen.getByLabelText(/address site/i), { target: { value: 'lolco' } });
    await waitFor(() => screen.getByText(/inmobiliaria lolco limitada/i));
    userEvent.click(screen.getByText(/inmobiliaria lolco limitada/i));

    userEvent.click(screen.getByText(/managers/i));

    userEvent.click(screen.getByLabelText(/Overseer/i));
    userEvent.click(screen.getByText(/paul zoulin/i));

    await waitFor(() => expect(screen.queryByText('Alejandra Paz Rojas Vergara')).toBeNull());

    userEvent.click(screen.getByLabelText(/Helpers/i));
    userEvent.click(screen.getByText('Alejandra Paz Rojas Vergara'));
    userEvent.click(screen.getByText('Alexia Francisca Bravo Jeria'));
    userEvent.click(screen.getByText('Alfonso Jesus Salinas Chepillan'));

    fireEvent.keyDown(screen.getByText('Cesar Quino Quevedo'), {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27,
    });

    await waitFor(() => expect(screen.queryByText('Cesar Quino Quevedo')).toBeNull());

    userEvent.click(screen.getByText(/storage/i));

    fireEvent.change(screen.getByLabelText(/address/i), { target: { value: 'lolco' } });
    await waitFor(() => screen.getByText(/inmobiliaria lolco limitada/i));
    userEvent.click(screen.getByText(/inmobiliaria lolco limitada/i));
    await waitFor(() => expect(screen.getByLabelText(/unit/i)).toHaveProperty('disabled', false));
    userEvent.type(screen.getByLabelText(/unit/i), '1234');

    userEvent.click(screen.getByLabelText(/Contact/i));
    userEvent.click(screen.getByText('Juan Medina'));
    await waitFor(() => expect(screen.queryByText('Cesar Quino Quevedo')).toBeNull());
    userEvent.type(screen.getByLabelText(/notes/i), 'my note');

    await waitFor(() => expect(screen.getByText(/Add equipment custodian/i)).toHaveProperty('disabled', false));
    userEvent.click(screen.getByText(/Add equipment custodian/i));

    userEvent.click(screen.getByText(/create/i));

    await waitFor(() => screen.getByText('Created successfully'));

    expect(createSites).toBeCalledTimes(1);
    expect(createSites).toBeCalledWith([site]);

    expect(onFinish).toBeCalledTimes(1);
  });

  it('should render site data and call update and onFinish functions', async () => {
    const updateSites = vi.fn(() => Promise.resolve(sitesMock));
    const onFinish = vi.fn();
    await act(() => {
      renderForTesting(<SiteForm dataSource={{ ...mockedDataSource, updateSites }} data={{ ...site, id: '123' }} onFinish={onFinish} />);
    });

    expect(screen.getByLabelText(/name/i)).toHaveProperty('value', site.name);
    expect(screen.getByLabelText(/description/i)).toHaveProperty('value', site.description);
    screen.getByText(`${site.coordinates.lat}, ${site.coordinates.lng}`);

    userEvent.click(screen.getByText(/managers/i));

    screen.getByText(`${(site.primaryResponsible as IProfile).firstName} ${(site.primaryResponsible as IProfile).lastName}`);
    screen.getByText(`${(site.secondaryResponsible[0] as IProfile).firstName} ${(site.secondaryResponsible[0] as IProfile).lastName}`);
    screen.getByText(`${(site.secondaryResponsible[1] as IProfile).firstName} ${(site.secondaryResponsible[1] as IProfile).lastName}`);
    screen.getByText(`${(site.secondaryResponsible[2] as IProfile).firstName} ${(site.secondaryResponsible[2] as IProfile).lastName}`);

    userEvent.click(screen.getByText(/storage/i));

    expect(screen.getByLabelText(/address/i)).toHaveProperty('value', '');
    expect(screen.getByLabelText(/unit/i)).toHaveProperty('value', '');
    expect(screen.queryByText((site.storage[0] as IStorage).responsible.firstName)).toBeNull();
    expect(screen.getByLabelText(/notes/i)).toHaveProperty('value', '');
    expect(screen.getByLabelText(/unit/i)).toHaveProperty('disabled', true);
    expect(screen.getByText(/Add equipment custodian/i)).toHaveProperty('disabled', true);

    screen.getByText((site.storage[0] as IStorage).address.formattedAddress);
    screen.getByText((site.storage[0] as IStorage).address.unit!);
    screen.getByText(`${(site.storage[0] as IStorage).responsible.firstName} ${(site.storage[0] as IStorage).responsible.lastName}`);
    screen.getByText((site.storage[0] as IStorage).notes!);

    userEvent.click(screen.getByText(/update/i));

    await waitFor(() => screen.getByText('Updated successfully'));

    expect(updateSites).toBeCalledTimes(1);
    expect(updateSites).toBeCalledWith([{ ...site, id: '123' }]);

    expect(onFinish).toBeCalledTimes(1);
  });

  it('should change from disabled to enabled checkbox', async () => {
    await act(() => {
      renderForTesting(<SiteForm dataSource={mockedDataSource} />);
    });

    screen.getByRole('checkbox', { name: /disabled/i });
    expect(screen.getByRole('checkbox')).toHaveProperty('checked', false);

    userEvent.click(screen.getByText(/disabled/i));

    screen.getByRole('checkbox', { name: /enabled/i });
    expect(screen.getByRole('checkbox')).toHaveProperty('checked', true);
  });

  it('should remove storage', async () => {
    await act(() => {
      renderForTesting(<SiteForm dataSource={mockedDataSource} data={{ ...site, id: '123' }} />);
    });

    userEvent.click(screen.getByText(/storage/i));

    screen.getByText((site.storage[0] as IStorage).address.formattedAddress);
    screen.getByText((site.storage[0] as IStorage).address.unit!);
    screen.getByText(`${(site.storage[0] as IStorage).responsible.firstName} ${(site.storage[0] as IStorage).responsible.lastName}`);
    screen.getByText((site.storage[0] as IStorage).notes!);

    userEvent.click(screen.getByTestId('CloseIcon'));

    expect(screen.queryByText((site.storage[0] as IStorage).address.formattedAddress)).toBeNull();
    expect(screen.queryByText((site.storage[0] as IStorage).address.unit!)).toBeNull();
    expect(
      screen.queryByText(`${(site.storage[0] as IStorage).responsible.firstName} ${(site.storage[0] as IStorage).responsible.lastName}`)
    ).toBeNull();
    expect(screen.queryByText((site.storage[0] as IStorage).notes!)).toBeNull();
  });
});
