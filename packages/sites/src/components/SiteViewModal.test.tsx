import { vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { sitesMock } from '../data/mocks/sites.mock';
import { getSitesHydrated } from '../utils/getSitesHydrated';
import { renderForTesting } from '../utils/renderForTesting';
import { SiteViewModal } from './SiteViewModal';
import '@react-google-maps/api';

vi.mock('@react-google-maps/api', () => ({
  useLoadScript: () => ({
    isLoaded: true,
    loadError: null,
  }),
  GoogleMap: () => <div>my map</div>,
  Marker: () => {},
}));

const site = getSitesHydrated(sitesMock.data)[0];

describe('SiteViewModal', () => {
  it('should render data when open is true', () => {
    renderForTesting(<SiteViewModal open data={site} />);

    screen.getByTestId('CloseIcon');
    screen.getByText(/costanera center/i);
    screen.getByText(/paul zoulin/i);
    screen.getByText(/56977778888/i);
    screen.getByText(/56577778888/i);
  });

  it('should not show modal when open is false', () => {
    renderForTesting(<SiteViewModal open={false} data={site} />);

    expect(screen.queryByTestId('CloseIcon')).toBeNull();
    expect(screen.queryByText(/costanera center/i)).toBeNull();
    expect(screen.queryByText(/paul zoulin/i)).toBeNull();
    expect(screen.queryByText(/56977778888/i)).toBeNull();
    expect(screen.queryByText(/56577778888/i)).toBeNull();
  });

  it('should call handleClose function', async () => {
    const handleClose = vi.fn();

    renderForTesting(<SiteViewModal open data={site} handleClose={handleClose} />);

    screen.getByText(/costanera center/i);

    fireEvent.click(screen.getByTestId('CloseIcon'));

    expect(handleClose).toBeCalledTimes(1);
  });

  it('should render map', () => {
    renderForTesting(<SiteViewModal open data={site} />);

    screen.getByText(/my map/i);
  });
});
