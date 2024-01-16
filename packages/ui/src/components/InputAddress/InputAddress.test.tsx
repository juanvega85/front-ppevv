import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, beforeAll } from 'vitest';
import renderForTesting from '../../utils/renderForTesting';
import { getMockGooogleMaps } from './googleMaps.mock';
import { InputAddress } from './InputAddress';

beforeAll(() => {
  global.google = getMockGooogleMaps();
});

describe('InputAddress', () => {
  it('should render ok', async () => {
    renderForTesting(<InputAddress label="Address" />);
    userEvent.type(screen.getByLabelText(/address/i), 'lolco');
    await waitFor(() => screen.getByText(/inmobiliaria lolco limitada/i));
  });

  it('should return full address object', async () => {
    const callback = vi.fn();
    renderForTesting(<InputAddress label="Address" onChange={callback} />);
    userEvent.type(screen.getByLabelText(/address/i), 'lolco');
    await waitFor(() => screen.getByText(/inmobiliaria lolco limitada/i));
    userEvent.click(screen.getByText(/inmobiliaria lolco limitada/i));
    await waitFor(() => expect(callback).toBeCalled());
    await waitFor(() =>
      expect(callback).toBeCalledWith({
        city: 'Santiago',
        coordinates: {
          lat: '-33.426447',
          lng: '-70.5535254',
        },
        country: 'Chile',
        description: 'Inmobiliaria Lolco Limitada - Lolco, Las Condes, Chile',
        formattedAddress: 'Lolco 7640, Las Condes, Región Metropolitana, Chile',
        locality: 'Las Condes',
        region: 'Región Metropolitana',
        route: 'Lolco',
        streetNumber: '7640',
      })
    );
  });

  it('should render error', async () => {
    renderForTesting(<InputAddress label="Address" error helperText="this is an error" />);
    screen.getByText(/This is an error/i);
  });
});
