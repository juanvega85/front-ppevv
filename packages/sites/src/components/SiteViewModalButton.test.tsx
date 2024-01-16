import { vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { renderForTesting } from '../utils/renderForTesting';
import { SiteViewModalButton } from './SiteViewModalButton';
import '@react-google-maps/api';
import { getSitesHydrated } from '../utils/getSitesHydrated';
import { sitesMock } from '../data/mocks/sites.mock';

const site = getSitesHydrated(sitesMock.data)[0];

vi.mock('@react-google-maps/api', () => ({
  useLoadScript: () => ({
    isLoaded: true,
    loadError: null,
  }),
  GoogleMap: () => <div></div>,
  Marker: () => <div></div>,
}));

describe('SiteViewModalButton', () => {
  it('should render icon button but not show modal', () => {
    renderForTesting(<SiteViewModalButton data={site} />);

    expect(screen.getByTestId('FmdGoodIcon').closest('button')).toHaveProperty('disabled', false);
    expect(screen.queryByTestId('CloseIcon')).toBeNull();
    expect(screen.queryByText(/costanera center/i)).toBeNull();
    expect(screen.queryByText(/paul zoulin/i)).toBeNull();
    expect(screen.queryByText(/56977778888/i)).toBeNull();
    expect(screen.queryByText(/56577778888/i)).toBeNull();
  });

  it('should render modal when clicked icon button', () => {
    renderForTesting(<SiteViewModalButton data={site} />);

    fireEvent.click(screen.getByTestId('FmdGoodIcon'));

    screen.getByText(/costanera center/i);
    screen.getByText(/paul zoulin/i);
    screen.getByText(/56977778888/i);
    screen.getByText(/56577778888/i);
  });

  it('should render icon button disabled', () => {
    renderForTesting(<SiteViewModalButton data={site} disabled />);

    expect(screen.getByTestId('FmdGoodIcon').closest('button')).toHaveProperty('disabled', true);
  });

  it('should render icon with lightColor', () => {
    renderForTesting(<SiteViewModalButton data={site} lightColor />);

    expect(screen.getByTestId('FmdGoodIcon').getAttribute('color')).toBe('lightgrey');
  });
});
